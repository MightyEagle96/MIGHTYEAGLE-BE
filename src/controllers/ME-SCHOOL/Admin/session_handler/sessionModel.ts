import { Schema, model } from 'mongoose';

const sessionSchema = new Schema({
  session: {
    type: String,
    unique: [true, 'This session already exists'],
    trim: true,
  },
  activeSession: { type: Boolean, default: true },
});

export default model('Session', sessionSchema);
