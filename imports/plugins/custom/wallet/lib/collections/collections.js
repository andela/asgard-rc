import { Mongo } from "meteor/mongo";
import * as Schemas from "../collections/schemas";

export const Wallets = new Mongo.Collection("Wallets");
Wallets.attachSchema(Schemas.Wallets);

export const Transaction = new Mongo.Collection("Transaction");
Transaction.attachSchema(Schemas.Transaction);
