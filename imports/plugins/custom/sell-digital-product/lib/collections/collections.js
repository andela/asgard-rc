import { Mongo } from "meteor/mongo";
import { DigitalProductSchema } from "./digitalProducts";

export const DigitalProducts = new Mongo.CollectionCollection("DigitalProducts");

DigitalProducts.attachSchema(DigitalProductSchema);
