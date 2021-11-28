import { Schema, model } from 'mongoose';

const resultSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  paper: { type: Schema.Types.ObjectId, ref: 'Question' },
  session: { type: Schema.Types.ObjectId, ref: 'Session' },
  score: Number,
});

export default model('Result', resultSchema);
