import { catchAsync } from '../../../shared/catchAsync';
import Rating from './rating-model';

export const MakeReview = catchAsync(async (req: any, res: any) => {
  req.body.user = req.user._id;
  const comment = await Rating.create(req.body);
  res.json({ message: 'success' });
});
