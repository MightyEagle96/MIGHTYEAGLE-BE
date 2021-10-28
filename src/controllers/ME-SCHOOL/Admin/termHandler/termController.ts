import { catchAsync } from '../../../../shared/catchAsync';
import CurrentTerm from './termModel';
import User from '../../../../models/user';

export const CreateCurrentTerm = catchAsync(async (req: any, res: any) => {
  await CurrentTerm.create(req.body);

  await User.updateMany(
    { account_type: 'me-school' },
    { currentSession: req.body.session }
  );
  res.json({ message: 'New term created' });
});

export const ListTerms = catchAsync(async (req: any, res: any) => {
  const terms = await CurrentTerm.find();
  res.json({ terms });
});

export const UpdateTerm = catchAsync(async (req: any, res: any) => {
  await CurrentTerm.updateMany({ activeTerm: true }, { activeTerm: false });

  await CurrentTerm.findByIdAndUpdate(req.params.id, {
    activeTerm: req.body.activeTerm,
  });
  await User.updateMany(
    { account_type: 'me-school' },
    { currentTerm: req.params.id }
  );
  res.json({ message: 'Term updated' });
});
