import React from "react";
import { Router } from "/client/api";
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

        {/* ............carousel START............................ */}

        <div id="myCarousel" className="carousel slide" data-ride="carousel">
          {/* <!-- Indicators --> */}
          <ol className="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" className="active" />
            <li data-target="#myCarousel" data-slide-to="1" />
            <li data-target="#myCarousel" data-slide-to="2" />
            <li data-target="#myCarousel" data-slide-to="4" />
          </ol>

          {/* <!-- Wrapper for slides --> */}
          <div className="carousel-inner  carousel-style">

            <div className="item item-container container active ">
              <img className="image-center" src="resources/assets/fashion3.jpeg" alt="" />
              <div className="carousel-caption">
                <div className="custom-caption caption-text ">
                  <h3 className="mb-10">CLOTHES</h3>
                  <h5 className="mt-20 mb-20">
                    <span className="orange-bg">Stay on the edge on fashion trends </span>
                  </h5>
                  <a
                    onClick={e => {
                      e.preventDefault();
                      Router.go("/tag/clothes");
                    }}
                    className="slider-btn hvr-icon-wobble-horizontal bold shop-now-color"
                  >
                    <button className="carousel-btn1">Shop Now</button>
                  </a>
                </div>
              </div>
            </div>

            <div className="item item-container container">
              <img className="image-center" src="resources/assets/samsung-phones.jpeg" alt="" />
              <div className="carousel-caption">
                <div className="custom-caption caption-text ">
                  <h3 className="mb-10">PHONES</h3>
                  <h5 className="mt-20 mb-20">
                    <span className="orange-bg">Get the best Phones</span>
                  </h5>
                  <a
                    onClick={e => {
                      e.preventDefault();
                      Router.go("/tag/phones");
                    }}
                    className="slider-btn hvr-icon-wobble-horizontal bold shop-now-color"
                  >
                    <button className="carousel-btn1">Shop Now</button>
                  </a>
                </div>
              </div>
            </div>

            <div className="item item-container container">
              <img className="image-center" src="resources/assets/electronics.jpeg" alt="" />
              <div className="carousel-caption">
                <div className="custom-caption caption-text">
                  <h3 className="mb-10">ELECTRONICS</h3>
                  <h5 className="mt-20 mb-20">
                    <span className="orange-bg">Best electronics products</span>
                  </h5>
                  <a
                    onClick={e => {
                      e.preventDefault();
                      Router.go("/tag/electronics");
                    }}
                    className="slider-btn hvr-icon-wobble-horizontal bold shop-now-color"
                  >
                    <button className="carousel-btn1">Shop Now</button>
                  </a>
                </div>
              </div>
            </div>

            <div className="item item-container container">
              <img className="image-center" src="resources/assets/pelican-digital-books.jpeg" alt="" />
              <div className="carousel-caption">
                <div className="custom-caption caption-text">
                  <h3 className="mb-10">Books for thoughts</h3>
                  <h5 className="mt-20 mb-20">
                    Go
                    <span className="orange-bg">Find your Digital Books here</span>
                  </h5>
                  <a
                    onClick={e => {
                      e.preventDefault();
                      Router.go("/tag/shop");
                    }}
                    className="slider-btn hvr-icon-wobble-horizontal bold shop-now-color"
                  >
                    <button className="carousel-btn1">Shop Now</button>
                  </a>
                </div>
              </div>
            </div>


          </div>


          <a className="carousel-control carousel-shade right" href="#myCarousel" data-slide="next">
            <span className="click-next" > <h1 className="carousel-click">	&rarr; </h1> </span>
          </a>

          <a className="carousel-control carousel-shade left" href="#myCarousel" data-slide="prev">
            <span className="click-prev" > <h1 className="carousel-click"> &larr; </h1> </span>
            {/* <span className="glyphicon glyphicon-chevron-left" /> */}
          </a>
        </div>

        <div id="featured-collections">
          <div className="container ">
            <div className="row">


              {/* ............Featured Collections START............................ */}
              <h4 className="">Featured Collections</h4>
              <hr />
            </div>
            <div className="row products mt-4" id="products">
              <div className="col-sm-3 " id="image-style1">
                <div className="img-zoom"
                  onClick={e => {
                    e.preventDefault();
                    Router.go("/tag/clothes");
                  }}
                >
                  <img src="resources/assets/mens-shoes1.jpeg" alt="" />
                </div>
                <div className="featured-caption">
                  <div className="custom-caption feature-text">
                    <h3 className="mb-10 text-center shop-now-text">Shoes</h3>
                  </div>
                </div>
              </div>

              <div className="col-sm-3 " id="image-style1">
                <div className="img-zoom"
                  onClick={e => {
                    e.preventDefault();
                    Router.go("/tag/clothes");
                  }}
                >
                  <img src="/resources/assets/pink-bag.jpeg" alt="" />
                </div>
                <div className="featured-caption">
                  <div className="custom-caption feature-text">
                    <h3 className="mb-10 text-center shop-now-text">Weekender Bags</h3>
                  </div>
                </div>
              </div>

              <div className="col-sm-3 " id="image-style1">
                <div className="img-zoom"
                  onClick={e => {
                    e.preventDefault();
                    Router.go("/tag/clothes");
                  }}
                >
                  <img src="resources/assets/groceries.jpeg" alt="" />
                </div>
                <div className="featured-caption">
                  <div className="custom-caption feature-text">
                    <h3 className="mb-10 text-center shop-now-text">Groceries</h3>
                  </div>
                </div>
              </div>

              <div className="col-sm-3 " id="image-style1">
                <div className="img-zoom"
                  onClick={e => {
                    e.preventDefault();
                    Router.go("/tag/electronics");
                  }}
                >
                  <img src="resources/assets/dome-camera.jpeg" alt="" />
                </div>
                <div className="featured-caption">
                  <div className="custom-caption feature-text">
                    <h3 className="mb-10 text-center shop-now-text">Dome Cameras</h3>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div id="digital-collections" className="my-5">
          <div className="container ">
            <div className="row">


              {/* ............digital collections START............................ */}

              <h4 className="">Digital Collections</h4>
              <hr />
            </div>
            <div className="row products">

              <div className="col-sm-2">
                <div className="img-zoom-digital"
                  onClick={e => {
                    e.preventDefault();
                    Router.go("/tag/digital");
                  }}
                >
                  <img src="resources/assets/12-rules.jpg" alt="" />
                </div>
                <div className="product-details text-center">
                  <p className="mt-1 mb-1 lead shop-now-text">Self Help</p>
                </div>
              </div>

              <div className="col-sm-2">
                <div className="img-zoom-digital"
                  onClick={e => {
                    e.preventDefault();
                    Router.go("/tag/digital");
                  }}
                >
                  <img src="resources/assets/outsider.jpg" alt="" />
                </div>
                <div className="product-details text-center">
                  <p className="mt-1 mb-1 lead shop-now-text">Audio Books</p>
                </div>
              </div>

              <div className="col-sm-2">
                <div className="img-zoom-digital"
                  onClick={e => {
                    e.preventDefault();
                    Router.go("/tag/digital");
                  }}
                >
                  <img src="resources/assets/harry.jpg" alt="" />
                </div>
                <div className="product-details text-center">
                  <p className="mt-1 mb-1 lead shop-now-text">Fictional Books</p>
                </div>
              </div>

              <div className="col-sm-2">
                <div className="img-zoom-digital"
                  onClick={e => {
                    e.preventDefault();
                    Router.go("/tag/digital");
                  }}
                >
                  <img src="resources/assets/uned.jpg" alt="" />
                </div>
                <div className="product-details text-center">
                  <p className="mt-1 mb-1 lead shop-now-text">Educational Books</p>
                </div>
              </div>

              <div className="col-sm-2">
                <div className="img-zoom-digital"
                  onClick={e => {
                    e.preventDefault();
                    Router.go("/tag/digital");
                  }}
                >
                  <img src="resources/assets/fuk.jpg" alt="" />
                </div>
                <div className="product-details text-center">
                  <p className="mt-1 mb-1 lead shop-now-text">Inspirational Books</p>
                </div>
              </div>

              <div className="col-sm-2">
                <div className="img-zoom-digital"
                  onClick={e => {
                    e.preventDefault();
                    Router.go("/tag/digital");
                  }}
                >
                  <img src="resources/assets/gi.jpg" alt="" />
                </div>
                <div className="product-details text-center">
                  <p className="mt-1 mb-1 lead shop-now-text">Auto Biography</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ............footer START............................ */}


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
