import { Schema, model } from 'mongoose';

const subjectSchema = new Schema({
  title: {
    type: String,
    unique: [true, 'This subject already exists'],
    trim: true,
  },
  category: { type: String, enum: ['junior', 'senior', 'both'] },
});

export default model('Subject', subjectSchema);
