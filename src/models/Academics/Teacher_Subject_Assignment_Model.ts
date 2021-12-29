import mongoose, { model, Schema } from 'mongoose';

const teacherSubjectAssignmentSchema = new Schema({
  teacher: { type: Schema.Types.ObjectId, ref: 'User' },
  subjectAndLevel: [
    {
      subject: { type: Schema.Types.ObjectId, ref: 'Subject' },
      level: { type: Schema.Types.ObjectId, ref: 'Level' },
    },
  ],
});

// teacherSubjectAssignmentSchema.pre(
//   'find',
//   function (this: any, next: mongoose.HookNextFunction) {
//     this.where({
//       $and: [
//         { 'subjectAndLevel.subject': { $ne: null } },
//         { 'subjectAndLevel.level': { $ne: null } },
//       ],
//     });
//     next();
//   }
// );

export default model(
  'TeacherSubjectAssignment',
  teacherSubjectAssignmentSchema
);
