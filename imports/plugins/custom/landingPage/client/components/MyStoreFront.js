import React from "react";
import { registerComponent, getHOCs, getRawComponent } from "/imports/plugins/core/components/lib";
import "../styles/style.css";


class MyStoreFront extends getRawComponent("Products") {
  componentDidMount() {
    const scriptNode = document.getElementById("twitter-wjs");
    if (scriptNode) {
      scriptNode.parentNode.removeChild(scriptNode);
    }

    !(function (data, newScript, id) {
      let file;
      const element = data.getElementsByTagName(newScript)[0];
      const TweetsUrl = /^http:/.test(data.location) ? "http" : "https";
      if (!data.getElementById(id)) {
        file = data.createElement(newScript);
        file.id = id;
        file.src = TweetsUrl + "://platform.twitter.com/widgets.js";
        element.parentNode.insertBefore(file, element);
      }
    }(document, "script", "twitter-wjs"));
  }
  render() {
    return (
      <div>
        <div className="header my-4">
          <div className="container">
            <div className="row">
              <div className="col-md-8 head1 mb-4">
                <div className="head1-texts mx-4">
                  <h2 className="">Always In Style!</h2>
                  <button className="btn-lg btn-dark mt-3">
                    SHOP NOW
                  </button>
                </div>
              </div>
              <div className="col-md-4">
                <div className="head2">
                  <div className="shop">
                    <button className="btn btn-outline-dark" href="#"> SHOP </button>
                  </div>
                </div>
                <div className="head3 mt-3 p-3">
                  <div className="head3-text ">
                    <h3>Asgard Mart</h3>
                    <div className="lead">MONEY BACK GUARANTEE</div>
                    <a className="" href="#">Discover More > </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div id="featured-collections">
          <div className="container ">
            <div className="row">

              <h4 className="">Featured Collections</h4>
              <hr />
            </div>
            <div className="row products mt-4">
              <div className="col-sm-3">
                <img src="resources/assets/watch1.jpeg" alt="" />
                <div className="product-details text-center">
                  <p className="mt-1 mb-1 lead">Watch</p>
                </div>
              </div>
              <div className="col-sm-3">
                <img src="resources/assets/nikke.jpeg" alt="" />
                <div className="product-details text-center">
                  <p className="mt-1 mb-1 lead">Shoes</p>
                </div>
              </div>
              <div className="col-sm-3">
                <img src="resources/assets/tan.jpeg" alt="" />
                <div className="product-details text-center">
                  <p className="mt-1 mb-1 lead">Bags</p>
                </div>
              </div>
              <div className="col-sm-3">
                <img src="resources/assets/high.jpeg" alt="" />
                <div className="product-details text-center">
                  <p className="mt-1 mb-1 lead">Heels</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div id="digital-collections" className="my-5">
          <div className="container ">
            <div className="row">

              <h4 className="">Digital Collections</h4>
              <hr />
            </div>
            <div className="row products">
              <div className="col-sm-2">
                <img src="resources/assets/12-rules.jpg" alt="" />
                <div className="product-details text-center">
                  <p className="mt-1 mb-1 lead">Self Help</p>
                </div>
              </div>
              <div className="col-sm-2">
                <img src="resources/assets/outsider.jpg" alt="" />
                <div className="product-details text-center">
                  <p className="mt-1 mb-1 lead">Fiction</p>
                </div>
              </div>
              <div className="col-sm-2">
                <img src="resources/assets/harry.jpg" alt="" />
                <div className="product-details text-center">
                  <p className="mt-1 mb-1 lead">Novel</p>
                </div>
              </div>
              <div className="col-sm-2">
                <img src="resources/assets/uned.jpg" alt="" />
                <div className="product-details text-center">
                  <p className="mt-1 mb-1 lead">Non Fiction</p>
                </div>
              </div>
              <div className="col-sm-2">
                <img src="resources/assets/fuk.jpg" alt="" />
                <div className="product-details text-center">
                  <p className="mt-1 mb-1 lead">Mystery</p>
                </div>
              </div>
              <div className="col-sm-2">
                <img src="resources/assets/gi.jpg" alt="" />
                <div className="product-details text-center">
                  <p className="mt-1 mb-1 lead">Auto Biography</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div id="footer">
          <div className="container py-5">
            <div className="row">

              <div className="col-md-3">

                <ul>
                  <li><h4 className="lead">Buy</h4></li>
                  <li><a href="">Registration</a></li>
                  <li><a href="">Stores</a></li>
                  <li><a href="">Categories</a></li>
                </ul>
              </div>
              <div className="col-md-3">
                <ul>
                  <li><h4 className="lead">Sell</h4></li>
                  <li><a href="">Start Selling</a></li>
                  <li><a href="">Learn to sell</a></li>
                  <li><a href="">Affiliates</a></li>
                </ul>
              </div>
              <div className="col-md-3">
                <h5 className="lead">Contact Us</h5>
                <p>asgardMart@andela.com</p>
                <div className="social-links">
                  <i className="fa fa-facebook-f" />
                  <i className="fa fa-twitter" />
                  <i className="fa fa-google-plus" />
                </div>
              </div>

              <div className="col-md-3">
                <h2 className="lead">ASGARD MART</h2>


                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 feed-container">

                  <a className="twitter-timeline" href="https://twitter.com/AsgardReaction?ref_src=twsrc%5Etfw">Tweets by AsgardReaction</a>
                </div>
              </div>
            </div>
            <div className="row mt-5 justify-content-center">
              <p className="Copyright text-center">Copyright © 2018 ASGARD MART Inc. All Rights Reserved.</p>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

registerComponent("MyStoreFront", MyStoreFront, getHOCs("Products"));

export default MyStoreFront;
