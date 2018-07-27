import React, { Component } from "react";
import ReactStars from "react-stars";
import { Meteor } from "meteor/meteor";
import "../stylesheet/style.css";
import PropTypes from "prop-types";
import { Reaction } from "/client/api";
import { ReactionProduct } from "/lib/api";
import moment from "moment";

/**
 * @class Review
 *
 * @classdesc user post review
 *
 */
class Reviews extends Component {
  /**
   * constructor - contains the constructor
   *
   * @param  {object} props the properties of the class component
   *
   * @return {void} no return or void
   *
   */
  constructor(props) {
    super(props);
    this.state = {
      comments: "",
      rate: 0,
      username: "",
      disableBtn: true,
      reviews: ""
    };
    this.onChange = this.onChange.bind(this);
    this.ratingChanged = this.ratingChanged.bind(this);
    this.addReview = this.addReview.bind(this);
    this.displayReviews = this.displayReviews.bind(this);
  }


  /**
 *
 * @returns { object } updated state
 * @memberof Ratings
*/
  componentDidMount() {
    const productName = Reaction.Router.getParam("handle");
    Meteor.call("getAllReviews", productName, (error, response) => {
      if (error) {
        return error;
      }
      this.setState({ reviews: response });
    });
  }

  /**
   * @description - handles the onchange event
   *
   * @param  {object} event the event for the content field
   *
   * @return {void}
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    if (event.target.name === "comments" && event.target.value.trim() === "") {
      this.setState({
        disableBtn: true
      });
      return false;
    }
    this.setState({
      disableBtn: false
    });

    return true;
  }

  displayReviews() {
    const allReviews = this.state.reviews;
    if (allReviews.length === 0) {
      return (<div className="comment-contents">No reviews found!</div>);
    }
    return (
      allReviews.map((review) => (
        <div key={review._id}>
          <div className="comment-contents">
            <a href="#" className="comment-author" title="Comment Author">
              <h4>{review.username}</h4>
            </a>
            <p>{review.comments}</p>
            <small className="text-muted">
              created at:
              {moment(review.createdAt).format("Do MMMM YYYY HH:mm")}
            </small>
            <ReactStars
              count={5}
              size={10}
              edit={false}
              value={review.rating}
            />
          </div>
        </div>
      ))
    );
  }
  /**
   * @description - handles user ratings
   *
   * @param  {Number} newRating
   *
   * @return {void}
   */
  ratingChanged = (newRating) => {
    this.setState(() => (
      { rate: newRating }
    ));
  }

  addReview(event) {
    event.preventDefault();
    const isAuthenticated = Meteor.user().emails.length > 0 ? true : false;
    if (!isAuthenticated) {
      return Alerts.toast("You need to be logged in to post a review", "error", {
        placement: "productDetail",
        autoHide: 10000
      });
    }
    if (this.state.rate === 0 && this.state.comments.trim() === "") {
      Alerts.toast("Your review is highly needed", "error", {
        placement: "productDetail",
        autoHide: 10000
      });
    } else if (this.state.rate === 0 && this.state.comments.trim() !== "") {
      Alerts.toast("Your rating is needed to serve you better", "error", {
        placement: "productDetail",
        autoHide: 10000
      });
    } else {
      const reviewObject = {
        rating: this.state.rate,
        comments: this.state.comments,
        username: Meteor.user().emails[0].address.split("@")[0],
        productName: Reaction.Router.getParam("handle")
      };
      Meteor.call("purchasedProducts", Meteor.userId(), (err, response) => {
        let purchasedProducts;
        if (err) {
          return err;
        }
        if (response) {
          purchasedProducts = response;
          if (purchasedProducts.indexOf(ReactionProduct.selectedProductId()) !== -1) {
            Meteor.call("createReview", reviewObject, (error, review) => {
              const productName = Reaction.Router.getParam("handle");
              if (review) {
                this.setState({
                  rate: 0,
                  comments: ""
                });
                Alerts.toast("Review Submitted", "success", {
                  placement: "productDetail",
                  autoHide: 10000
                });
                Meteor.call("getAllReviews", productName, (errors, result) => {
                  if (errors) {
                    return errors;
                  }
                  this.setState({ reviews: result });
                });
              }
            });
          } else {
            Alerts.toast("You need to be purchase this product to review it", "error", {
              placement: "productDetail",
              autoHide: 10000
            });
          }
        }
      });
    }
  }

  /**
   * @description render - renders the class component
   *
   * @return {object} returns an object
   *
   */
  render() {
    const { ratingChanged, onChange, addReview, displayReviews } = this;
    return (
      <div>
        <div className="bus-info-reviews">
          <h3><b>Reviews</b></h3>
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <div className="post-form">
                  <div className="display-reviews">
                    { displayReviews() }
                  </div>
                  <form
                    action="#"
                    method=""
                    role="form"
                    onSubmit={addReview}
                  >
                    <textarea
                      name="comments"
                      value={this.state.comments}
                      onChange={onChange}
                      required
                    />
                    <div>
                      <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={15}
                        color2={"#ffd700"}
                        value={this.state.rate}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={this.state.disableBtn}
                      className="btn send-button"
                    >
                      Add review
                    </button>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


Reviews.propTypes = {
  rating: PropTypes.string
};


export default Reviews;
