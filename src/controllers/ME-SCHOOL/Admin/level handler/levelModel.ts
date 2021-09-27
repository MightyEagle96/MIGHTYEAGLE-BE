import { Schema, model } from 'mongoose';

const levelSchema = new Schema({
  level: {
    type: String,
    unique: [true, 'This level already exists'],
    trim: true,
  },
});

export default model('Level', levelSchema);
