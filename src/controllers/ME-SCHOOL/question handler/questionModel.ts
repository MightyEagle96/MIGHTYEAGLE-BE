import { Schema, model } from 'mongoose';

const questionSchema = new Schema({
  currentClass: { type: Schema.Types.ObjectId, ref: 'Level' },
  currentTerm: { type: Schema.Types.ObjectId, ref: 'Term' },
  subject: { type: Schema.Types.ObjectId, ref: 'Subject' },
  testType: { type: Schema.Types.ObjectId, ref: 'TestType' },
  questions: [
    {
      question: String,
      optionA: String,
      optionB: String,
      optionC: String,
      optionD: String,
      optionE: String,
      correctAns: String,
    },
  ],
});

export default model('Question', questionSchema);
