import { Schema, model } from 'mongoose';

const questionSchema = new Schema({
  currentClass: { type: Schema.Types.ObjectId, ref: 'Level' },
  currentTerm: { type: Schema.Types.ObjectId, ref: 'CurrentTerm' },
  subject: { type: Schema.Types.ObjectId, ref: 'Subject' },
  testType: { type: Schema.Types.ObjectId, ref: 'TestType' },
  divisor: { type: Number, default: 10 },
  duration: { type: Number, default: 0 },
  activated: { type: Boolean, default: false },
  questions: [
    {
      question: { type: String, trim: true },
      optionA: { type: String, trim: true },
      optionB: { type: String, trim: true },
      optionC: { type: String, trim: true },
      optionD: { type: String, trim: true },
      // optionE: { type: String, trim: true },
      correctAns: { type: String, trim: true },
    },
  ],
});

export default model('Question', questionSchema);
