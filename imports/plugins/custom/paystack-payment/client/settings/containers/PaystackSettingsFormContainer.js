import React, { Component } from "react";
import PropTypes from "prop-types";
import { composeWithTracker } from "@reactioncommerce/reaction-components";
import { Meteor } from "meteor/meteor";
import { Packages } from "/lib/collections";
import { TranslationProvider } from "/imports/plugins/core/ui/client/providers";
import { i18next, Reaction } from "/client/api";
import { PaystackSettingsForm } from "../components";

class PaystackSettingsFormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apiKey: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.saveUpdate = this.saveUpdate.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ apiKey: e.target.value });
  }

  handleSubmit(settings) {
    const packageId = this.props.packageData._id;
    const settingsKey = this.props.packageData.registry[0].settingsKey;

    const fields = [{
      property: "apiKey",
      value: settings.apiKey
    }, {
      property: "support",
      value: settings.support
    }, {
      property: "secretkey",
      value: settings.secretkey
    }, {
      property: "testMode",
      value: settings.testMode
    }];
    this.saveUpdate(fields, packageId, settingsKey);
  }

  saveUpdate(fields, id, settingsKey) {
    Meteor.call("registry/update", id, settingsKey, fields, (err) => {
      if (err) {
        return Alerts.toast(i18next.t("admin.settings.saveFailed"), "error");
      }
      return Alerts.toast(i18next.t("admin.settings.saveSuccess"), "success");
    });
  }

  render() {
    const settingsKey = this.props.packageData.registry[0].settingsKey;
    return (
      <TranslationProvider>
        <PaystackSettingsForm
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          settings={this.props.packageData.settings[settingsKey]}
        />
      </TranslationProvider>
    );
  }
}

PaystackSettingsFormContainer.propTypes = {
  packageData: PropTypes.object
};

const composer = ({}, onData) => {
  const subscription = Meteor.subscribe("Packages", Reaction.getShopId());
  if (subscription.ready()) {
    const packageData = Packages.findOne({
      name: "paystack",
      shopId: Reaction.getShopId()
    });
    onData(null, { packageData });
  }
};

export default composeWithTracker(composer)(PaystackSettingsFormContainer);
