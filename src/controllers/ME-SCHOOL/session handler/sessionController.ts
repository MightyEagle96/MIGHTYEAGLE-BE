import { catchAsync } from '../../../shared/catchAsync';
import Session from './sessionModel';

export const CreateSession = catchAsync(async (req: any, res: any) => {
  await Session.create(req.body);
  res.json({ message: 'done' });
});

export const ListSessions = catchAsync(async (req: any, res: any) => {
  const sessions = await Session.find();
  res.json({ sessions });
});
