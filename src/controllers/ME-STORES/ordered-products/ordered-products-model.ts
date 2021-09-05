import mongoose, { Schema, model, Document } from "mongoose";

const orderedProductSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Store" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  amount_paid: { type: Number },
  quantity: { type: Number },
  date_ordered: { type: Date, default: Date.now() },
});

export default model("OrderedProducts", orderedProductSchema);
