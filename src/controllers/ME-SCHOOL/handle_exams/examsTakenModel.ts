import { Schema, model } from 'mongoose';

const examsTakenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  paper: { type: Schema.Types.ObjectId, ref: 'Question' },
});

export default model('ExamsTaken', examsTakenSchema);
