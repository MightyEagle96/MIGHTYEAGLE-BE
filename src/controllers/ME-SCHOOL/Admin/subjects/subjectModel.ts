import mongoose, { Schema, model } from 'mongoose';
import {
  BOTH_LABEL,
  JUNIOR_LABEL,
  SENIOR_LABEL,
} from '../../../../utils/labels';

const subjectSchema = new Schema({
  title: {
    type: String,
    unique: [true, 'This subject already exists'],
    trim: true,
  },
  category: {
    type: String,
    enum: [JUNIOR_LABEL, SENIOR_LABEL, BOTH_LABEL],
    required: true,
  },
});

subjectSchema.pre(
  'find',
  function (this: any, next: mongoose.HookNextFunction) {
    // this.where({})
    next();
  }
);

export default model('Subject', subjectSchema);
