import { catchAsync } from '../../../shared/catchAsync';
import User from '../../../models/user';

export const CreateAgent = catchAsync(async (req: any, res: any) => {
  await User.create(req.body);
  //console.log(req.body);
  res.status(201).json({ status: 'success' });
});

export const ViewAgents = catchAsync(async (req: any, res: any) => {
  const agents = await User.find(req.query);
  res.json({ agents });
});
