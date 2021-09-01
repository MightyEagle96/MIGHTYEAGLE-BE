import User from '../models/user';
import { catchAsync } from '../shared/catchAsync';

export const GET_USER = catchAsync(async (req: any, res: any) => {
  const user = await User.findById(req.params.id);
  return res.json({ user });
});
