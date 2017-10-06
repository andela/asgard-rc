import SimpleSchema from "simpl-schema";

/**
* TaxRates Schema
*/

export const TaxRates = new SimpleSchema({
  country: {
    type: String
  },
  county: {
    type: String,
    optional: true
  },
  postal: {
    type: String,
    optional: true
  },
  rate: {
    type: Number,
    decimal: true
  }
});
