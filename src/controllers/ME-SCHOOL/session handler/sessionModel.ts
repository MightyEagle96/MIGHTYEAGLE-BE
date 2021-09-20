import { Schema, model } from 'mongoose';

const sessionSchema = new Schema({
  session: {
    type: String,
    unique: [true, 'This subject already exists'],
    trim: true,
  },
});

export default model('Session', sessionSchema);
