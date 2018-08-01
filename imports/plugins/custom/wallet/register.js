import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Wallet",
  name: "wallet",
  icon: "fa fa-google-wallet",
  autoEnable: true,
  registry: [{
    route: "/account/wallet",
    icon: "fa fa-google-wallet",
    provides: ["shortcut"],
    template: "walletDashboard",
    label: "Wallet",
    container: "core",
    name: "wallet",
    workflow: "coreDashboardWorkflow"
  },
  {
    label: "Wallet",
    provides: ["paymentSettings"],
    container: "dashboard",
    template: "adminWalletDashboard"
  },
  {
    template: "walletCheckout",
    provides: ["paymentMethod"],
    icon: "fa fa-credit-card-alt"
  }],
  layout: [{
    collection: "Wallets"
  }]
});
