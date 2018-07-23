import { Template } from "meteor/templating";
// import { Components } from "@reactioncommerce/reaction-components";
import LandingPage from "../components/MyStoreFront";

Template.landingPage.helpers({
  landingPage() {
    return {
      component: LandingPage
    };
  }
});

// window.twttr = (function(d, s, id) {
//   var js, fjs = d.getElementsByTagName(s)[0],
//     t = window.twttr || {};
//   if (d.getElementById(id)) return t;
//   js = d.createElement(s);
//   js.id = id;
//   js.src = "https://platform.twitter.com/widgets.js";
//   fjs.parentNode.insertBefore(js, fjs);

//   t._e = [];
//   t.ready = function(f) {
//     t._e.push(f);
//   };

//   return t;
// }(document, "script", "twitter-wjs"));
