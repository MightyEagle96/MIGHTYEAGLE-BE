import user from '../../../../models/user';
import { catchAsync } from '../../../../shared/catchAsync';
import levelModel from '../level handler/levelModel';

export const StudentsRegister = catchAsync(async (req: any, res: any) => {
  const students = await user.find({
    $and: [{ role: 'student', level: req.params.classId }],
  });
  const level = await levelModel.findById(req.params.classId);
  res.json({ level, count: students.length, students });
});
