import { catchAsync } from '../../../../shared/catchAsync';
import Session from './sessionModel';
import User from '../../../../models/user';

export const CreateSession = catchAsync(async (req: any, res: any) => {
  //first of all set all active sessions from true to false
  await Session.updateMany({ activeSession: true }, { activeSession: false });

  await Session.create(req.body);

  await User.updateMany(
    { account_type: 'me-school' },
    { currentSession: req.body.session }
  );

  res.status(201).json({ message: 'New session created' });
});

export const ListSessions = catchAsync(async (req: any, res: any) => {
  const sessions = await Session.find();
  res.json({ sessions });
});

export const UpdateSession = catchAsync(async (req: any, res: any) => {
  await Session.updateMany({ activeSession: true }, { activeSession: false });

  await Session.findByIdAndUpdate(req.params.id, {
    activeSession: req.body.activeSession,
  });

  await User.updateMany(
    { account_type: 'me-school' },
    { currentSession: req.params.id }
  );
  res.json({ message: 'Session updated' });
});
