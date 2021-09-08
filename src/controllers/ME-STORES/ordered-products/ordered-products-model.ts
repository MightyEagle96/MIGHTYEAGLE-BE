import mongoose, { Schema, model, Document } from 'mongoose';

const orderedProductSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Store' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  amount_paid: { type: Number },
  quantity: { type: Number },
  tx_ref: String,
  status: String,
  date_ordered: { type: Date, default: Date.now() },
});

export default model('OrderedProducts', orderedProductSchema);
