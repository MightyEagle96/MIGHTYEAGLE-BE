import { Schema, model } from 'mongoose';

const schema = new Schema({
  firstName: String,
  lastName: String,
  otherName: String,
  centerNumber: String,
  email: String,
  phoneNumber: String,
  subjectCombination: [{ type: String }],
  uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' },
});

export default model('Verificaton', schema);
