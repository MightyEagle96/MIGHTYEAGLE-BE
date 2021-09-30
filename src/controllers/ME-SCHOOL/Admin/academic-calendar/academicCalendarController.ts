import User from '../../../../models/user';
import { catchAsync } from '../../../../shared/catchAsync';
import sessionModel from '../session handler/sessionModel';
import termModel from '../termHandler/termModel';

export const SetAcademicCalendar = catchAsync(async (req: any, res: any) => {
  const currentSession = await sessionModel.findOne({ activeSession: true });
  const currentTerm = await termModel.findOne({ activeTerm: true });
  console.log(currentSession);
  await User.updateMany(
    { account_type: 'me-school' },
    { currentTerm: currentTerm._id, currentSession: currentSession._id }
  );
  res.json({ message: 'done' });
});