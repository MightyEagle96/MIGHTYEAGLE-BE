import { Schema, model } from 'mongoose';

const examsTakenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  examsTaken: [
    {
      codeName: String,
      currentClass: String,
      currentTerm: String,
      testType: String,
      dateTaken: { type: Date, default: Date.now() },
    },
  ],
});

export default model('ExamsTaken', examsTakenSchema);
