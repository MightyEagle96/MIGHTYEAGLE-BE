import { Schema, model } from 'mongoose';

const wardSchema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
  ward: {
    type: String,
    enum: ['male', 'female', 'children', 'maternity', 'emergency'],
  },
  date_admitted: { type: Date, default: Date.now() },
  date_discharged: Date,
});

export default model('Ward', wardSchema);
