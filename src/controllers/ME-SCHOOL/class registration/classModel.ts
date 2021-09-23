import { Schema, model } from 'mongoose';

const classSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});
