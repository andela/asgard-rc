import SimpleSchema from "simpl-schema";

/**
 * @summary Themes Schema
 * Schema for themes used in reaction-layout
 */

export const Themes = new SimpleSchema({
  "name": {
    type: String,
    index: true
  },

  "author": {
    type: String,
    optional: true
  },

  "layout": {
    type: String,
    optional: true,
    defaultValue: "coreLayout"
  },

  "url": {
    type: String,
    optional: true
  },

  "components": {
    type: Array,
    optional: true,
    blackbox: true
  },
  "components.$": {
    type: Object,
    optional: true,
    blackbox: true
  }
});
