import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Static-Page",
  name: "reaction-static-pages-view",
  autoEnable: true,
  registry: [
    {
      route: "/info/:pageAddress",
      name: "info",
      template: "staticPage"
    }
  ]
});
