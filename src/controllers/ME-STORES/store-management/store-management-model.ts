import mongoose, { Schema, model, Document } from 'mongoose';

const storeSchema = new Schema({
  addedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  category: String,
  itemName: { type: String, trim: true },
  description: { type: String, trim: true },
  quantity: { type: Number, default: 1 },
  price: Number,
  out_of_stock: { type: Boolean, default: false },
  imageUrl: { type: String, trim: true },

  dateAdded: { type: Date, default: Date.now() },
});

export default model('Store', storeSchema);
