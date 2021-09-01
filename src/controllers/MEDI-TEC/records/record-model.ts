import { model, Schema } from 'mongoose';

const recordSchema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
  data: [
    {
      recordType: String,
      createdAt: { type: Date, default: Date.now() },
      reference: String,
    },
  ],
});

export default model('Record', recordSchema);
