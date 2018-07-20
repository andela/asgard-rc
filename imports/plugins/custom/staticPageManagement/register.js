import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Static Pages Management",
  name: "staticPageManagement",
  icon: "fa fa-plus",
  autoEnable: true,
  settings: {
    name: "Static Pages"
  },
  registry: [
    {
      provides: ["dashboard"],
      route: "/dashboard/static",
      name: "staticPageManagement",
      label: "Static Page Management",
      description: "Create static pages",
      icon: "fa fa-plus",
      priority: 1,
      container: "custom",
      permissions: [
        {
          label: "dashboard/static",
          permission: "dashboard/static"
        }
      ],
      template: "staticPageManagement"
    }
  ]
});
