import { Schema, model } from 'mongoose';
import {
  BOTH_LABEL,
  JUNIOR_LABEL,
  SENIOR_LABEL,
} from '../../../../utils/labels';

const levelSchema = new Schema({
  level: {
    type: String,
    unique: [true, 'This level already exists'],
    trim: true,
  },
  category: {
    type: String,
    enum: [JUNIOR_LABEL, SENIOR_LABEL, BOTH_LABEL],
    required: true,
  },
  levelTeacher: { type: Schema.Types.ObjectId, ref: 'User' },
});

export default model('Level', levelSchema);
