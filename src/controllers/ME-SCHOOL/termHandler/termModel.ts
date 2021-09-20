import { Schema, model } from 'mongoose';

const currentTermSchema = new Schema({
  term: {
    type: String,
    unique: [true, 'This subject already exists'],
    trim: true,
  },
});

export default model('CurrentTerm', currentTermSchema);
