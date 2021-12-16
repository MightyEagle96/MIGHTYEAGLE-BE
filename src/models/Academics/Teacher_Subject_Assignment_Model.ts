import { model, Schema } from 'mongoose';

const teacherSubjectAssignmentSchema = new Schema({
  teacher: { type: Schema.Types.ObjectId, ref: 'User' },
  subjectAndLevel: [
    {
      subject: { type: Schema.Types.ObjectId, ref: 'Subject' },
      level: { type: Schema.Types.ObjectId, ref: 'Level' },
    },
  ],
});

export default model(
  'TeacherSubjectAssignment',
  teacherSubjectAssignmentSchema
);
