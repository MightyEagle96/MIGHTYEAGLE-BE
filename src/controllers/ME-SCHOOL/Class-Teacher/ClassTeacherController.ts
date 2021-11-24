import user from '../../../models/user';
import { catchAsync } from '../../../shared/catchAsync';
import levelModel from '../Admin/level handler/levelModel';

export const StudentsInMyClass = catchAsync(async (req: any, res: any) => {
  const students = await user.find({
    $and: [{ role: 'student' }, { level: req.user.level }],
  });

  const level = await levelModel.findById(req.user.level);
  res.json({ count: students.length, level, students });
});
