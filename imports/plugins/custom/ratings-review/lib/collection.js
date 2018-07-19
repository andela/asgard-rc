import { Mongo } from "meteor/mongo";
import * as Schemas from "./schema";

export const Reviews = new Mongo.Collection("Reviews");

Reviews.attachSchema(Schemas.Reviews);
