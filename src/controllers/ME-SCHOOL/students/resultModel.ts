import { Schema, model } from 'mongoose';

const resultSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  term: { type: Schema.Types.ObjectId, ref: 'Term' },
  testType: { type: Schema.Types.ObjectId, ref: 'TestType' },
  subject: { type: Schema.Types.ObjectId, ref: 'Subject' },
  session: { type: Schema.Types.ObjectId, ref: 'Session' },
  level: { type: Schema.Types.ObjectId, ref: 'Level' },
  score: Number,
});

export default model('Result', resultSchema);
