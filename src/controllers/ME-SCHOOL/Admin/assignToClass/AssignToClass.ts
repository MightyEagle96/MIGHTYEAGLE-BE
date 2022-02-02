import User from '../../../../models/user';
import { catchAsync } from '../../../../shared/catchAsync';

export const AssignToClass = catchAsync(async (req: any, res: any) => {
  await User.findOneAndUpdate(
    { _id: req.body.userId },
    {
      level: req.body.level,
    }
  );
  res.json({ message: 'Assigned to class' });
});

export const YetToBeAssigned = catchAsync(async (req: any, res: any) => {
  const awaitingUsers = await User.find({
    $and: [{ role: req.query.role, level: null }],
  });
  res.json({ count: awaitingUsers.length, awaitingUsers });
});
