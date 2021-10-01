import User from '../../../../models/user';
import { catchAsync } from '../../../../shared/catchAsync';

export const AssignToClass = catchAsync(async (req: any, res: any) => {
  await User.findOneAndUpdate(
    { _id: req.body.studentId },
    {
      level: req.body.level,
      currentSession: req.user.currentSession,
      currentTerm: req.user.currentTerm,
    }
  );
  res.json({ message: 'Assigned to class' });
});
