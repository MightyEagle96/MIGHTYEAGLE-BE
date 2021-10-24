import user from '../../../../models/user';
import { catchAsync } from '../../../../shared/catchAsync';

export const ViewUsers = catchAsync(async (req: any, res: any) => {
  const users = await user.find(req.query);
  const length = users.length;
  res.json({ length, users });
});
