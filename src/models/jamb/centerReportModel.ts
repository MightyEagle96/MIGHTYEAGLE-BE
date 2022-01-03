import mongoose, { model, Schema } from 'mongoose';

const centerReportSchema = new Schema({
  center: { type: Schema.Types.ObjectId, ref: 'JambCenter' },
  report: { type: Array },
});

export default model('CenterReport', centerReportSchema);
