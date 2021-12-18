import mongoose, { model, Schema } from 'mongoose';

const storeSchema = new Schema({
  name: { type: String, trim: true },
  quantity: { type: Number, default: 0 },
  price: { type: Number },
  expirationDate: { type: Date },
  available: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
});

storeSchema.pre('save', function (this: any, next: mongoose.HookNextFunction) {
  if (this.quantity > 0) {
    this.available = true;
  }
  next();
});
export default model('StoreManager', storeSchema);
