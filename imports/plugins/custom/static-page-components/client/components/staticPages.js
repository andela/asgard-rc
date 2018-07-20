import React, { Component } from "react";
import PropTypes from "prop-types";
import { registerComponent } from "@reactioncommerce/reaction-components";
import { Reaction } from "/lib/api";

class StaticPagesComponent extends Component {
  static propTypes = {
    pages: PropTypes.array
  };
  visitThisPage(page) {
    return Reaction.Router.go(`/info/${page.pageAddress}`);
  }

  renderStaticPagesComponent() {
    const { pages }  = this.props;
    const realOutput =
    <div className="static-pages dropdown page-menu" role="menu" data-delay="1000">
      <div className="dropdown-toggle" data-toggle="dropdown">
      More
        <span className="caret" />
      </div>
      <ul className="dropdown-menu custom-dropdown">
        {pages.map(page => {
          return (
            <li key={page._id}>
              <a className="static-dropdown" onClick={() => this.visitThisPage(page)}>
                {page.pageName}
              </a>
            </li>
          );
        })}
      </ul>
    </div>;
    const fakeOutput =
  <div className="static-pages dropdown page-menu" role="menu" data-delay="1000">
    <div className="dropdown-toggle" data-toggle="dropdown">
          More
      <span className="caret" />
    </div>
    <ul className="dropdown-menu custom-dropdown">
      <li key={1}>
        <a className="static-dropdown" >
                  No pages yet
        </a>
      </li>
    </ul>
  </div>;
    const output = (this.props.pages.length > 0) ? realOutput : fakeOutput;
    return (
      output
    );
  }

  render() {
    return (
      <div className="static-pages" role="menu">
        {this.renderStaticPagesComponent()}
      </div>
    );
  }
}

registerComponent("StaticPagesComponent", StaticPagesComponent);

export default StaticPagesComponent;
