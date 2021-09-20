import { Schema, model } from 'mongoose';

const ratingSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Store' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  comment: String,
  created_at: { type: Date, default: Date.now() },
});

export default model('Rating', ratingSchema);
