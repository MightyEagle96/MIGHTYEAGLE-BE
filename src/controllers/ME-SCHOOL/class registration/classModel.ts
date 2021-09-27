import { Schema, model } from 'mongoose';

const classSchema = new Schema({
  level: { type: Schema.Types.ObjectId, ref: 'Level' },
  session: { type: Schema.Types.ObjectId, ref: 'Session' },
  students: [{ student: Schema.Types.ObjectId, ref: 'User' }],
});

export default model('ClassRegister', classSchema);
