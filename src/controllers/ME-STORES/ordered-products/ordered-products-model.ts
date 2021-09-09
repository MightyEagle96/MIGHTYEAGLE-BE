import mongoose, { Schema, model, Document } from 'mongoose';

const orderedProductSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Store' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  quantity: Number,
  txRef: Number,
  status: String,
  transaction_id: Date,
  deliveryStatus: {
    type: String,
    enum: ['awaiting fulfillment', 'shipped', 'fulfilled'],
  },
  date_ordered: { type: Date, default: Date.now() },
});

export default model('OrderedProducts', orderedProductSchema);
