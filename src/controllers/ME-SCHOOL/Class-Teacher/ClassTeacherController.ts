import user from '../../../models/user';
import { catchAsync } from '../../../shared/catchAsync';

export const StudentsInMyClass = catchAsync(async (req: any, res: any) => {
  const students = await user.find({
    $and: [{ role: 'student' }, { level: req.user.level }],
  });
  res.json({ count: students.length, students });
});
