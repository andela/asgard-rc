import React, { Component } from "react";
import PropTypes from "prop-types";
import { Reaction } from "/client/api";
import { TextField, Button, IconButton, SortableTableLegacy } from "@reactioncommerce/reaction-ui";
import ProductGridContainer from "/imports/plugins/included/product-variant/containers/productGridContainer";
import { accountsTable } from "../helpers";

class SearchModal extends Component {
  static propTypes = {
    accounts: PropTypes.array,
    handleAccountClick: PropTypes.func,
    handleChange: PropTypes.func,
    handleClick: PropTypes.func,
    handleTagClick: PropTypes.func,
    handleToggle: PropTypes.func,
    priceRanges: PropTypes.array,
    products: PropTypes.array,
    siteName: PropTypes.string,
    tags: PropTypes.array,
    unmountMe: PropTypes.func,
    value: PropTypes.string,
    vendors: PropTypes.array
  }
  constructor(props) {
    super(props);
    this.state = {
      filterBy: {
        price: "",
        vendor: "",
        hashtags: ""
      },
      sortBy: ""
    };
  }
  renderSearchInput() {
    return (
      <div className="rui search-modal-input">
        <label data-i18n="search.searchInputLabel">Search {this.props.siteName}</label>
        <i className="fa fa-search search-icon" />
        <TextField
          className="search-input"
          textFieldStyle={{ marginBottom: 0 }}
          onChange={this.props.handleChange}
          value={this.props.value}
        />
        <Button
          className="search-clear"
          i18nKeyLabel="search.clearSearch"
          label="Clear"
          containerStyle={{ fontWeight: "normal" }}
          onClick={this.props.handleClick}
        />
      </div>
    );
  }
  renderSearchTypeToggle() {
    if (Reaction.hasPermission("admin")) {
      return (
        <div className="rui search-type-toggle">
          <div
            className="search-type-option search-type-active"
            data-i18n="search.searchTypeProducts"
            data-event-action="searchCollection"
            data-event-value="products"
            onClick={() => this.props.handleToggle("products")}
          >
            Products
          </div>
          {Reaction.hasPermission("accounts") &&
            <div
              className="search-type-option"
              data-i18n="search.searchTypeAccounts"
              data-event-action="searchCollection"
              data-event-value="accounts"
              onClick={() => this.props.handleToggle("accounts")}
            >
              Accounts
            </div>
          }
        </div>
      );
    }
  }

  handleFilterChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      ...this.state,
      filterBy: { ...this.state.filterBy, [name]: value }
    });
  }

  handleSortChange = (event) => {
    const { value } = event.target;
    this.setState({ sortBy: value });
  }

  handlePriceFilter = (products, range) => {
    if (range === "1-9.99") {
      return products.filter((product) => product.price.min >= 1 && product.price.max <= 9.99);
    }
    if (range === "10-99.99") {
      return products.filter((product) => product.price.min >= 10 && product.price.max <= 99.99);
    }
    if (range === "100-999.99") {
      return products.filter((product) => product.price.min >= 100 && product.price.max <= 999.99);
    }
    if (range === "1000-9999.99") {
      return products.filter((product) => product.price.min >= 1000 && product.price.max <= 9999.99);
    }
  }

  SortProducts = (products, sortBy) => {
    switch (sortBy) {
      case "asc":
        return products.sort((prev, next) => prev.title > next.title);
      case "desc":
        return products.sort((prev, next) => prev.title < next.title);
      case "low-high":
        return products.sort((prev, next) => prev.price.min > next.price.min);
      case "high-low":
        return products.sort((prev, next) => prev.price.min < next.price.min);
      case "newarrivals":
        return products.sort((prev, next) => Date.parse(prev.createdAt) < Date.parse(next.createdAt));
      default:
        return products;
    }
  }

  renderProductSearchTags() {
    return (
      <div className="rui search-modal-tags-container">
        <p className="rui suggested-tags" data-i18n="search.suggestedTags">Suggested tags</p>
        <div className="rui search-tags">
          {this.props.tags.map((tag) => (
            <span
              className="rui search-tag"
              id={tag._id} key={tag._id}
              onClick={() => this.props.handleTagClick(tag._id)}
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    );
  }

  renderProductSearchFilter = () => {
    const vendorOptions = this.props.vendors.map(vendor =>
      <option key={vendor} value={vendor}>{vendor}</option>);

    const tagsOptions = this.props.tags.map(tag =>
      <option key={tag._id} value={tag._id}>{tag.name}</option>);

    return (
      <span className="rui product-filter pull-left">
        <h3>Filter By</h3>
        <div className="filter-options">
          <span className="rui-options">
        Vendors:
            &nbsp;<select name="vendor" onChange={(event) => this.handleFilterChange(event)}>
              <option value="">Select a Vendor</option>
              {vendorOptions}
            </select>
          </span>
          <span className="rui-options">
        Price:
          &nbsp;<select name="price" onChange={(event) => this.handleFilterChange(event)}>
              <option value="">Select a price Range</option>
              <option value="1-9.99">₦1.00-₦9.99</option>
              <option value="10-99.99">₦10.00-₦99.99</option>
              <option value="100-999.99">₦100.00-₦999.99</option>
              <option value="1000-9999.99">₦1000.00-₦9999.99</option>
            </select>
          </span>
          <span className="rui-options">
        Tags:
          &nbsp;<select name="hashtags" onChange={(event) => this.handleFilterChange(event)}>
              <option value="">Select a tag</option>
              {tagsOptions}
            </select>
          </span>
        </div>
      </span>
    );
  }

  renderSortProducts() {
    return (
      <span className="rui product-sort pull-right">
        <span> <h3>Sort By</h3> </span>
        <select name="sortBy" onChange={(event) => this.handleSortChange(event)}>
          <option value="">Select an Option to SortBy</option>
          <option value="asc">Ascending Order</option>
          <option value="desc">Descending Order</option>
          <option value="newarrivals">New Arrivals</option>
          <option value="low-high">Price: Low - High</option>
          <option value="high-low">Price: High - Low</option>
        </select>
      </span>
    );
  }


  render() {
    let { products } = this.props;
    const { filterBy, sortBy } = this.state;
    const { price, vendor, hashtags } = filterBy;
    if (price !== "") {
      products = this.handlePriceFilter(products, price);
    }
    if (hashtags !== "") {
      products = products.filter((product) => product.hashtags.indexOf(hashtags) !== -1);
    }
    if (vendor !== "") {
      products = products.filter((product) => product.vendor === vendor);
    }
    if (sortBy !== "") {
      products = this.SortProducts(products, sortBy);
    }

    return (
      <div>
        <div className="rui search-modal-close"><IconButton icon="fa fa-times" onClick={this.props.unmountMe} /></div>
        <div className="rui search-modal-header">
          {this.renderSearchInput()}
          {this.renderSearchTypeToggle()}
          {this.props.tags.length > 0 && this.renderProductSearchTags()}
        </div>
        {this.props.products.length > 0 && <div className="rui filterContainer">
          {this.renderProductSearchFilter()}
          {this.renderSortProducts()}
        </div>}
        <div className="rui search-modal-results-container">
          {products.length > 0 &&
            <ProductGridContainer
              products={products}
              unmountMe={this.props.unmountMe}
              isSearch={true}
            />
          }
          {this.props.accounts.length > 0 &&
            <div className="data-table">
              <div className="table-responsive">
                <SortableTableLegacy
                  data={this.props.accounts}
                  columns={accountsTable()}
                  onRowClick={this.props.handleAccountClick}
                />
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default SearchModal;
