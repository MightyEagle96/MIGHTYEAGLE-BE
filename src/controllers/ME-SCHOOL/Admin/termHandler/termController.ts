import { catchAsync } from '../../../../shared/catchAsync';
import CurrentTerm from './termModel';

export const CreateCurrentTerm = catchAsync(async (req: any, res: any) => {
  await CurrentTerm.create(req.body);
  res.json({ message: 'New term created' });
});

export const ListTerms = catchAsync(async (req: any, res: any) => {
  const terms = await CurrentTerm.find();
  res.json({ terms });
});
