import User from '../../../../models/user';
import { catchAsync } from '../../../../shared/catchAsync';

export const AssignToClass = catchAsync(async (req: any, res: any) => {
  await User.findOneAndUpdate(
    { _id: req.body.userId },
    {
      level: req.body.level,
      currentSession: req.user.currentSession,
      currentTerm: req.user.currentTerm,
    }
  );
  res.json({ message: 'Assigned to class' });
});

export const YetToBeAssigned = catchAsync(async (req: any, res: any) => {
  const awaitingStudents = await User.find({
    $and: [{ role: 'student', level: null }],
  });
  res.json({ count: awaitingStudents.length, awaitingStudents });
});

export const StaffYetToBeAssigned = catchAsync(async (req: any, res: any) => {
  const awaitingStaff = await User.find({
    $and: [{ role: 'classTeacher', level: null }],
  });
  res.json({ count: awaitingStaff.length, awaitingStaff });
});
