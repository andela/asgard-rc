import { Mongo } from "meteor/mongo";
import { DigitalProductSchema } from "./digitalProducts";

export const DigitalProducts = new Mongo.Collection("DigitalProducts");

DigitalProducts.attachSchema(DigitalProductSchema);
