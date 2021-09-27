import { Schema, model } from 'mongoose';

const subjectRegister = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  level: { type: Schema.Types.ObjectId, ref: 'Level' },
  currentTerm: { type: Schema.Types.ObjectId, ref: 'CurrentTerm' },
  session: { type: Schema.Types.ObjectId, ref: 'Session' },
  subjects: [{ subject: { type: Schema.Types.ObjectId, ref: 'Subject' } }],
});

export default model('SubjectRegister', subjectRegister);
