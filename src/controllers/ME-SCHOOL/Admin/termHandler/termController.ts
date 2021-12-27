import { catchAsync } from '../../../../shared/catchAsync';
import CurrentTerm from './termModel';
import User from '../../../../models/user';

export const CreateCurrentTerm = catchAsync(async (req: any, res: any) => {
  await CurrentTerm.updateMany({ activeTerm: true }, { activeTerm: false });

  req.body.activeTerm = true;
  const currentTerm = await CurrentTerm.create(req.body);

  await User.updateMany(
    { account_type: 'me-school' },
    { currentTerm: currentTerm._id }
  );

  res.json({ message: 'New term created', currentTerm });
});

export const ListTerms = catchAsync(async (req: any, res: any) => {
  const terms = await CurrentTerm.find(req.query);
  res.json({ terms });
});

export const UpdateTerm = catchAsync(async (req: any, res: any) => {
  await CurrentTerm.updateMany({ activeTerm: true }, { activeTerm: false });

  const currentTerm = await CurrentTerm.findByIdAndUpdate(req.params.id, {
    activeTerm: req.body.activeTerm,
  });
  await User.updateMany(
    { account_type: 'me-school' },
    { currentTerm: req.params.id }
  );
  res.json({ message: 'Term updated', currentTerm });
});

export const ActiveTerm = catchAsync(async (req: any, res: any) => {
  //to get the active term
  const currentTerm = await CurrentTerm.find({ activeTerm: true });

  if (currentTerm) {
    res.json({ activeTerm: currentTerm[0] });
  } else res.json({ activeTerm: { term: '' } });
});
