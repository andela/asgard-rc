import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Static-Page-Component",
  name: "reaction-static-pages-component",
  autoEnable: true,
  registry: [
    {
      name: "static components",
      template: "staticPagesNav"
    }
  ]
});
