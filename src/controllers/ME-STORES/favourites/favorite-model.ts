import mongoose, { Schema, model, Document } from 'mongoose';

const favoriteSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  item: { type: Schema.Types.ObjectId, ref: 'Store' },
});

export default model('Favorite', favoriteSchema);
