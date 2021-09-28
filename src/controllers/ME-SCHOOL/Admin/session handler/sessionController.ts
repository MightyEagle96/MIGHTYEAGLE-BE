import { catchAsync } from '../../../../shared/catchAsync';
import Session from './sessionModel';

export const CreateSession = catchAsync(async (req: any, res: any) => {
  //first of all set all active sessions from true to false
  await Session.updateMany({ activeSession: true }, { activeSession: false });

  await Session.create(req.body);

  res.status(201).json({ message: 'New session created' });
});

export const ListSessions = catchAsync(async (req: any, res: any) => {
  const sessions = await Session.find();
  res.json({ sessions });
});
