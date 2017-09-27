import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Components } from "@reactioncommerce/reaction-components";

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

  renderVariantMedia() {
    return (
      <div className={"variant-media"}>
        {this.renderVariantImages()}
        {this.renderVariantMediaUpload()}
      </div>
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
