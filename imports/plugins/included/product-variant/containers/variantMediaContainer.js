import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";
import { Media } from "/lib/collections";
import VariantMedia from "../components/variantMedia";

const wrapComponent = (Comp) => (
  class VariantMediaContainer extends Component {
    static propTypes = {
      variant: PropTypes.object,
      variantImages: PropTypes.arrayOf(PropTypes.object)
    }

    handleRemoveVariantMedia = (image) => {
      const imageUrl = image.url();
      const mediaId = image._id;

      return Alerts.alert({
        title: "Remove Media?",
        type: "warning",
        showCancelButton: true,
        imageUrl,
        imageHeight: 150
      }, (isConfirm) => {
        if (isConfirm) {
          Media.remove({ _id: mediaId }, (error) => {
            if (error) {
              Alerts.toast(error.reason, "warning", {
                autoHide: 10000
              });
            }

            // updateImagePriorities();
          });
        }
      });
    }

    render() {
      if (this.props.variant) {
        return (
          <Comp
            handleRemoveVariantMedia={this.handleRemoveVariantMedia}
            variant={this.props.variant}
            variantImages={this.props.variantImages}
          />
        );
      }

      return null;
    }
  }
);


function composer(props, onData) {
  let variantImages = [];
  const variant = props.variant;

  if (variant) {
    variantImages = Media.find({
      "metadata.variantId": variant._id
    }, {
      sort: {
        "metadata.priority": 1
      }
    }).fetch();
  }

  onData(null, {
    variantImages: variantImages
  });
}


registerComponent("VariantMedia", VariantMedia, [
  composeWithTracker(composer),
  wrapComponent
]);

export default compose(
  composeWithTracker(composer),
  wrapComponent
)(VariantMedia);
