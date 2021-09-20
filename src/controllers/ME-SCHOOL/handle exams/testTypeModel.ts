import { Schema, model } from 'mongoose';

const testTypeSchema = new Schema({
  testType: {
    type: String,
    unique: [true, 'This subject already exists'],
    trim: true,
  },
});

export default model('TestType', testTypeSchema);
