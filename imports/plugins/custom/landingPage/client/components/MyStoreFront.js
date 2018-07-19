import React from "react";
import { registerComponent, getHOCs, getRawComponent } from "/imports/plugins/core/components/lib";
import "../styles/style.css";


class MyStoreFront extends getRawComponent("Products") {
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
              <hr/>
            </div>
            <div className="row products mt-4">
              <div className="col-sm-3">
                <img src="resources/assets/watch1.jpeg" alt="" />
                <div className="product-details text-center">
                  <p className="mt-1 mb-1">Gold Watch in leather tan.</p>
                  <p className="lead">N 14,000</p>
                </div>
              </div>
              <div className="col-sm-3">
                <img src="resources/assets/nikke.jpeg" alt="" />
                <div className="product-details text-center">
                  <p className="mt-1 mb-1">Air Max 270 Flyknit Trainers</p>
                  <p className="lead">N 36,000</p>
                </div>
              </div>
              <div className="col-sm-3">
                <img src="resources/assets/tan.jpeg" alt="" />
                <div className="product-details text-center">
                  <p className="mt-1 mb-1">V-bar structured bag</p>
                  <p className="lead">N 71,000</p>
                </div>
              </div>
              <div className="col-sm-3">
                <img src="resources/assets/high.jpeg" alt="" />
                <div className="product-details text-center">
                  <p className="mt-1 mb-1">Percussion embellished high heels</p>
                  <p className="lead">N 28,890</p>
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
                  <p className="mt-1 mb-1">12 Rules for Life</p>
                  <p className="lead">N 7,050</p>
                </div>
              </div>
              <div className="col-sm-2">
                <img src="resources/assets/outsider.jpg" alt=""/>
                <div className="product-details text-center">
                  <p className="mt-1 mb-1">The Outsider</p>
                  <p className="lead">N 6,100</p>
                </div>
              </div>
              <div className="col-sm-2">
                <img src="resources/assets/harry.jpg" alt="" />
                <div className="product-details text-center">
                  <p className="mt-1 mb-1">Sorcerer's Stone</p>
                  <p className="lead">N 16,500</p>
                </div>
              </div>
              <div className="col-sm-2">
                <img src="resources/assets/uned.jpg" alt="" />
                <div className="product-details text-center">
                  <p className="mt-1 mb-1">Educated: A Memoir</p>
                  <p className="lead">N 8,890</p>
                </div>
              </div>
              <div className="col-sm-2">
                <img src="resources/assets/fuk.jpg" alt="" />
                <div className="product-details text-center">
                  <p className="mt-1 mb-1">The Subtle Art</p>
                  <p className="lead">N 5,000</p>
                </div>
              </div>
              <div className="col-sm-2">
                <img src="resources/assets/gi.jpg" alt="" />
                <div className="product-details text-center">
                  <p className="mt-1 mb-1">Give People Money</p>
                  <p className="lead">N 1,500</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div id="footer">
          <div className="container py-5">
            <div className="row">
              <div className="col-md-3">
                <h2 className="lead">ASGARD MART</h2>
              </div>
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
// registerComponent("products", MyStoreFront, getHOCs("Products"));

export default MyStoreFront;
