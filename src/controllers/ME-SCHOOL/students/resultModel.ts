import { Schema, model } from 'mongoose';

const resultSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  level: { type: Schema.Types.ObjectId, ref: 'Level' },
  currentTerm: { type: Schema.Types.ObjectId, ref: 'Term' },
  currentSession: { type: Schema.Types.ObjectId, ref: 'Session' },
  subject: { type: Schema.Types.ObjectId, ref: 'Subject' },
  results: [
    {
      testType: {
        type: Schema.Types.ObjectId,
        ref: 'TestType',
        unique: [true, 'You cannot create same type of test'],
      },
      score: Number,
    },
  ],
});

export default model('Result', resultSchema);
