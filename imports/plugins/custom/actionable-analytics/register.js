import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Analytics",
  name: "analytics",
  icon: "fa fa-bar-chart",
  autoEnable: true,
  settings: {
    name: "analytics"
  },
  registry: [{
    route: "/dashboard/analytics",
    provides: ["dashboard"],
    name: "analytics",
    label: "analytics",
    description: "View Analytics",
    icon: "fa fa fa-bar-chart",
    container: "core",
    workflow: "coreDashboardWorkflow",
    template: "analytics"
  }]
});
