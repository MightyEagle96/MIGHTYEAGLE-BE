"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const teacherSubjectAssignmentSchema = new mongoose_1.Schema({
    teacher: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    subjectAndLevel: [
        {
            subject: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Subject' },
            level: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Level' },
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
exports.default = mongoose_1.model('TeacherSubjectAssignment', teacherSubjectAssignmentSchema);
