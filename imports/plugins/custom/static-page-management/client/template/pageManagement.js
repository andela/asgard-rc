import { Template } from "meteor/templating";
import { $ } from "meteor/jquery";
import { Meteor } from "meteor/meteor";
import { StaticPages } from "/lib/collections";

Template.managePageForm.onCreated(function () {
  this.autorun(() => {
    this.subscribe("StaticPages");
  });
});

Template.managePageForm.helpers({
  alreadyAddedPages() {
    const instance = Template.instance();
    if (instance.subscriptionsReady()) {
      return StaticPages.find({});
    }
  }
});

Template.managePageForm.events({
  "click .deletePage"(event) {
    event.preventDefault();
    event.stopPropagation();
    // confirm delete
    Alerts.alert(
      {
        title: "Are you sure you want to remove this page?",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonText: "Yes"
      },
      confirmed => {
        if (confirmed) {
          const _id = $(event.currentTarget)
            .parents("tr")
            .attr("id");
          Meteor.call("deletePage", _id);
        }
        return false;
      }
    );
  },

  "click .editPage"(event) {
    event.preventDefault();
    event.stopPropagation();

    // Get ID of the page and then retrieve from the database
    const _id = $(event.currentTarget)
      .parents("tr")
      .attr("id");
    const pageDetails = StaticPages.find({ _id }).fetch();

    // Set the page form to values gotten from the form for editing
    $(".static-page")
      .find("#sp-name")
      .val(pageDetails[0].pageName);
    $(".static-page")
      .find("#sp-url")
      .val(pageDetails[0].pageAddress);
    $(".static-page")
      .find(".edit-page-data")
      .attr("id", pageDetails[0]._id);
    $(".static-page")
      .find("#sp-content")
      .val(pageDetails[0].pageContent);
    $(".static-page")
      .find(".save-static-page")
      .html("Update Page");
  }
});

Template.addOrEditPageForm.events({
  "submit form": event => {
    event.preventDefault();
    const field = event.target;
    const pageName = field.name.value;
    const pageAddress = field.url.value;
    const pageContent = field.content.value;
    let createdAt = new Date();
    const updatedAt = new Date();

    if (
      $(".static-page")
        .find(".edit-page-data")
        .attr("id") === undefined
    ) {
      const checkPageDetails = StaticPages.findOne({ $or: [{ pageName: pageName }, { pageAddress: pageAddress }] });
      if (checkPageDetails) {
        return Alerts.toast("The page name/address exists already", "error");
      }

      Meteor.call("insertPage", pageName, pageAddress, pageContent, createdAt, function (err) {
        if (err) {
          Alerts.toast(err.message, "error");
        } else {
          Alerts.toast("Page Successfully Created", "success");
        }
      });
    } else {
      const _id = $(".static-page")
        .find(".edit-page-data")
        .attr("id");
      const pageDetails = StaticPages.find({ _id }).fetch();

      if (pageDetails.length > 0) {
        createdAt = pageDetails[0].createdAt;
        // Update the data in the database
        Meteor.call("updatePage", _id, pageName, pageAddress, pageContent, createdAt, updatedAt, function (err) {
          if (err) {
            Alerts.toast(err.message, "error");
          } else {
            Alerts.toast("Page Successfully Modified", "success");
          }
        });
      } else {
        Alerts.toast("Oops! Page Not Found, Please create a new Static Page", "error");
      }
      $(".static-page")
        .find(".edit-page-data")
        .attr("id", "");
      $(".static-page")
        .find(".save-static-page")
        .html("Create Page");
    }

    field.name.value = "";
    field.url.value = "";
    field.content.value = "";
  }
});
