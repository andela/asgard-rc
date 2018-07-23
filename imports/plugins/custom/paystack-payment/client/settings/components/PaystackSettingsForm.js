import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { TextField, Translation, Checkbox, Switch } from "/imports/plugins/core/ui/client/components";

class PaystackSettingsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {
        apiKey: props.settings.apiKey,
        support: props.settings.support,
        secretkey: props.settings.secretkey,
        testMode: props.settings.testMode
      },
      checkbox: {
        "Authorize": _.includes(props.settings.support, "Authorize"),
        "De-authorize": _.includes(props.settings.support, "De-authorize"),
        "Capture": _.includes(props.settings.support, "Capture"),
        "Refund": _.includes(props.settings.support, "Refund")
      }
    };
  }

  handleStateChange = (event) => {
    const { settings } = this.state;
    settings[event.target.name] = event.target.value;
    this.setState({ settings });
  }
  handleSwitch = (event, isInputChecked, name) => {
    const { settings } = this.state;
    settings[name] = !this.state.settings.testMode;
    this.setState({ settings });
  }
  handleCheckBox = (event, isInputChecked, name) => {
    const { checkbox, settings } = this.state;
    checkbox[name] = isInputChecked;
    this.setState({ checkbox });
    if (!_.includes(settings.support, name) && isInputChecked) {
      settings.support.push(name);
      return this.setState({ settings });
    }
    const index = settings.support.indexOf(name);
    settings.support.splice(index, 1);
    return this.setState({ settings });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    return this.props.onSubmit(this.state.settings);
  }


  render() {
    const { settings } = this.props;
    const setting = this.state.settings;

    return (
      <div>
        { !settings.apiKey &&
          <div className="alert alert-info">
            <Translation defaultValue="Paystack Credentials" i18nKey="admin.paymentSettings.paystackCredentials"/>
          </div>
        }

        <form onSubmit={this.handleSubmit}>
          <TextField
            label="API Key"
            name="apiKey"
            type="text"
            onChange={this.handleStateChange}
            value={setting.apiKey}
          />

          <TextField
            label="Secret Key"
            name="secretkey"
            type="text"
            onChange={this.handleStateChange}
            value={setting.secretkey}
          />

          <Switch
            label="Api test mode"
            onChange={this.handleSwitch}
            name="testMode"
            checked={this.state.settings.testMode}
          />
          <br/>

          <label className="control-label">
            <Translation defaultValue="Payment provider supported methods" i18nKey="reaction-payments.paymentSettings.supportedMethodsLabel"/>
          </label>
          <br/>

          <div>
            <Checkbox
              label="Authorize"
              onChange={this.handleCheckBox}
              name="Authorize"
              checked={this.state.checkbox.Authorize}
            />
          </div>

          <div>
            <Checkbox
              label="De-authorize"
              onChange={this.handleCheckBox}
              name="De-authorize"
              checked={this.state.checkbox["De-authorize"]}
            />
          </div>

          <div>
            <Checkbox
              label="Capture"
              onChange={this.handleCheckBox}
              name="Capture"
              checked={this.state.checkbox.Capture}
            />
          </div>

          <div>
            <Checkbox
              label="Refund"
              onChange={this.handleCheckBox}
              name="Refund"
              checked={this.state.checkbox.Refund}
            />
          </div>


          <button className="btn btn-primary pull-right" type="submit">
            <Translation defaultValue="Save Changes" i18nKey="app.saveChanges"/>
          </button>
        </form>

      </div>
    );
  }
}

PaystackSettingsForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  settings: PropTypes.object
};

export default PaystackSettingsForm;
