import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Components } from "@reactioncommerce/reaction-components";
import Dropzone from "react-dropzone";

import { ReactionProduct } from "/lib/api";
import { Reaction } from "/client/api";
import { Media } from "/lib/collections";
import { Meteor } from "meteor/meteor";


function uploadHandler(files, propsVariant) {
  // TODO: It would be cool to move this logic to common ValidatedMethod, but
  // I can't find a way to do this, because of browser's `FileList` collection
  // and it `Blob`s which is our event.target.files.
  // There is a way to do this: http://stackoverflow.com/a/24003932. but it's too
  // tricky


  const productId = ReactionProduct.selectedProductId();
  // const variant = ReactionProduct.selectedVariant();
  const variant = propsVariant;

  if (typeof variant !== "object") {
    return Alerts.add("Please, create new Variant first.", "danger", {
      autoHide: true
    });
  }
  const variantId = variant._id;
  const shopId = ReactionProduct.selectedProduct().shopId || Reaction.getShopId();
  const userId = Meteor.userId();
  let count = Media.find({
    "metadata.variantId": variantId
  }).count();

  for (const file of files) {
    const fileObj = new FS.File(file);

    fileObj.metadata = {
      ownerId: userId,
      productId: productId,
      variantId: variantId,
      shopId: shopId,
      priority: count,
      toGrid: 1 // we need number
    };

    Media.insert(fileObj);
    count++;
  }

  return true;
}


class VariantMedia extends Component {
  renderVariantMediaUpload() {
    const variantImages = this.props.variantImages;

    const classNames = classnames({
      "upload-media-dropzone": true,
      "isMedia": variantImages.length ? true : false
    });

    return (
      <div className={classNames}>
        <span className={"upload-media-icon"}>
          <Components.Icon
            icon={"fa fa-upload"}
          />
        </span>
        <span className={"upload-media-text"}>
          <Components.Translation
            i18nKey={"admin.uploadMedia"}
            defaultValue={"Drag and drop your files here"}
          />
        </span>
      </div>
    );
  }

  renderVariantImages() {
    const variantImages = this.props.variantImages;

    if (variantImages) {
      const images = variantImages.map((image, index) => {
        return (
          <li>
            <img
              src={image.url()}
              key={index}
            />
            <Components.IconButton
              icon="fa fa-times"
              onClick={() => this.props.handleRemoveVariantMedia(image)}
              i18nKeyTooltip="admin.mediaGallery.deleteImage"
              tooltip="Click to remove image"
            />
          </li>
        );
      });

      return (
        <ul className="variant-images list-unstyled">
          {images}
        </ul>
      );
    }

    return null;
  }



  onDrop = (files) => {
    console.log("THE DROP!");
    if (files.length === 0) {
      console.log("goodbye123");
      return;
    }
    console.log("hello123?", files);
    uploadHandler(files, this.props.variant);
    // return this.handleDrop(files);
    // return this.props.onDrop(files); // change to props
  }

  handleDrop = (files) => {
    console.log("handledrip");
    uploadHandler(files, this.props.variant);
  }





  renderVariantMedia() {
    return (


      <Dropzone
        className="rui gallery-drop-pane"
        disableClick={true}
        multiple={true}
        disablePreview={true}
        onDrop={this.onDrop}
        ref="dropzone"
        accept="image/jpg, image/png, image/jpeg"
      >



      <div className={"variant-media"}>
        {this.renderVariantImages()}
        {this.renderVariantMediaUpload()}
      </div>

    </Dropzone>
    );
  }

  render() {
    return (
      <div>
        {this.renderVariantMedia()}
      </div>
    );
  }
}

VariantMedia.propTypes = {
  handleRemoveVariantMedia: PropTypes.func,
  variant: PropTypes.object,
  variantImages: PropTypes.arrayOf(PropTypes.object)
};

export default VariantMedia;
