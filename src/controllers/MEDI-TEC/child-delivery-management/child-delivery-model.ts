import { Schema, model } from 'mongoose';

const childDeliverySchma = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
  number_of_babies: { type: Number, default: 1 },
  gender: [{ type: String, enum: ['f', 'm'] }],
  weight: String,
  date_of_birth: String,
  time_of_birth: String,
  description: String,
});

export default model('ChildDelivery', childDeliverySchma);
