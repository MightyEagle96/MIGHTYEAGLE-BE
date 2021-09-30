import { Schema, model } from 'mongoose';

const currentTermSchema = new Schema({
  term: {
    type: String,
    unique: [true, 'This term already exists'],
    trim: true,
  },
  activeTerm: { type: Boolean, default: true },
});

export default model('CurrentTerm', currentTermSchema);