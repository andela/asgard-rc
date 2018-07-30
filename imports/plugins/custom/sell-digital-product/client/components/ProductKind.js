import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import axios from "axios";
import { Reaction } from "/client/modules/core";
import { Logger } from "/client/api";
import { ReactionProduct } from "/lib/api";
import { registerComponent } from "@reactioncommerce/reaction-components";

class ProductKind extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productKind: "physical",
      uploading: false,
      uploadSuccess: false,
      uploadError: false
    };
  }

  componentDidMount() {
    Meteor.call("fetchDigitalProduct", ReactionProduct.selectedProductId(), (err, result) => {
      if (result !== "" && result.isDigital === true && Reaction.hasAdminAccess()) {
        document.querySelector("#productKind").value = "digital";
        this.handleChange();
      }
    });
  }

  componentDidUpdate() {
    try {
      Meteor.call("fetchDigitalProduct", ReactionProduct.selectedProductId(),
        (err, result) => {
          if (result === "") {
            this.refs.productUrl.value = "";
          }
        });
    } catch (e) {
      Logger.info("Error fetching digital product");
    }
  }

  /**
    *  Handler changes in product type selection.
    * @param  {object} e event object
    * @return {undefined}
    */

  handleChange = () => {
    const { productKind } = this.refs;
    const kind = productKind.options[productKind.selectedIndex].value;
    const productDetails = {
      uploadSuccess: false,
      productId: ReactionProduct.selectedProductId(),
      isDigital: true
    };
    if (kind === "digital") {
      productDetails.isDigital = true;
      this.setState({
        ...this.state,
        productKind: "digital"
      });
      window.productKind = "digital";
    }
    if (kind === "physical") {
      productDetails.isDigital = false;
      this.setState({
        ...this.state,
        productKind: "physical"
      });
      window.productKind = "physical";
    }
    Meteor.call("uploadDigitalProduct", productDetails, (err) => {
      if (err) {
        Logger.error("Inserting digital product failed");
      }
    });
    Meteor.call("fetchDigitalProduct", productDetails.productId, (err, result) => {
      setTimeout(() => {
        if (result !== "") {
          this.refs.productUrl.value = result.productUrl;
        }
      }, 200);
    });
  }

  handleUpload = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", this.refs.file.files[0]);
    formData.append("upload_preset", "asgard_rc");
    return axios({
      method: "post",
      url: "https://api.cloudinary.com/v1_1/saheedt/upload",
      data: formData,
      withCredentials: false,
      onUploadProgress: (progress) => {
        this.setState({
          uploading: true,
          uploadSuccess: false,
          uploadError: false
        });
        const uploadprogress = Math.floor((progress.loaded * 100) / progress.total);
        this.refs.productUrl.value = `${uploadprogress}%`;
      }
    }).then((response) => {
      this.setState({
        uploadSuccess: true,
        uploading: false,
        uploadError: false
      });
      this.refs.productUrl.value = `${response.data.secure_url}`;
      localStorage.setItem(window.location.pathname, response.data.secure_url);
      const productdetails = {
        uploadSuccess: true,
        productId: ReactionProduct.selectedProductId(),
        productTitle: ReactionProduct.selectedProduct().title,
        isDigital: true,
        productUrl: response.data.secure_url,
        bytes: response.data.bytes
      };
      Meteor.call("uploadDigitalProduct", productdetails, (err) => {
        if (err) {
          Logger.error("Error inserting product");
        }
      });
    })
      .catch((err) => {
        Logger.error(`Upload failed ${err}`);
        this.setState({
          uploadSuccess: false,
          uploading: false,
          uploadError: true
        });
        this.refs.productUrl.value = "";
      });
  }
  render() {
    if (!Reaction.hasAdminAccess()) {
      return null;
    }
    return (
      <div>
        <select id="productKind" style={{ width: "50%", padding: "0px !important",
          marginBottom: "10px", height: "35px",
          position: "relative", left: "-3px" }} ref="productKind"
                  onChange={this.handleChange} //eslint-disable-line
        >
          <option key="1" value="physical" >Physical Product</option>
          <option key="2" value="digital">Digital Product</option>
        </select>
        { this.state.productKind === "digital" &&
                <div>
                  <form style={{ display: "flex", flexDirection: "row" }}>
                    <input
                      ref="file"
                      type="file"
                      style={{ width: "50%", marginBottom: "10px", height: "30px", position: "relative", left: "0px" }}
                      className="form-control-file"
                    />
                    <button value="upload" onClick={this.handleUpload} type="submit"
                      style={{ height: "30px", marginLeft: "10px", color: "white", backgroundColor: "#228cfe", border: "1px", borderColor: "grey" }}
                    >
                      { this.state.uploading && <i className="fa fa-spinner fa-spin" /> }
                      &nbsp;Upload
                    </button>
                  </form>
                  { this.state.uploadSuccess && <label style={{ color: "green" }}>Success!</label> }
                  { this.state.uploadError && <label style={{ color: "red" }}>Error Uploading</label> }
                  <input
                    ref="productUrl"
                    placeholder="Product URL"
                    style={{ width: "100%", marginBottom: "10px", height: "30px", position: "relative", left: "0px" }}
                    type="text"
                    disabled
                  />
                </div>
        }
      </div>
    );
  }
}

registerComponent("ProductKind", ProductKind);

export default ProductKind;
