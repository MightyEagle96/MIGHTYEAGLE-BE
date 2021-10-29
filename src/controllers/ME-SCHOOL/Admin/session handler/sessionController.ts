import { catchAsync } from '../../../../shared/catchAsync';
import Session from './sessionModel';
import User from '../../../../models/user';

export const CreateSession = catchAsync(async (req: any, res: any) => {
  console.log(req.body);
  //first of all set all active sessions from true to false
  await Session.updateMany({ activeSession: true }, { activeSession: false });

  req.body.activeSession = true;
  const currentSession = await Session.create(req.body);

  await User.updateMany(
    { account_type: 'me-school' },
    { currentSession: currentSession._id }
  );

  res.status(201).json({ message: 'New session created', currentSession });
});

export const ListSessions = catchAsync(async (req: any, res: any) => {
  const sessions = await Session.find();
  res.json({ sessions });
});

export const UpdateSession = catchAsync(async (req: any, res: any) => {
  await Session.updateMany({ activeSession: true }, { activeSession: false });

  const currentSession = await Session.findByIdAndUpdate(req.params.id, {
    activeSession: req.body.activeSession,
  });

  await User.updateMany(
    { account_type: 'me-school' },
    { currentSession: req.params.id }
  );
  res.json({ message: 'Session updated', currentSession });
});

export const ActiveSession = catchAsync(async (req: any, res: any) => {
  //to get the active term
  const currentSession = await Session.find({ activeSession: true });

  if (currentSession) {
    res.json({ activeSession: currentSession[0] });
  } else res.json({ activeSession: { session: '-' } });
});
