import { catchAsync } from '../../../shared/catchAsync';
import Favorite from './favorite-model';

export const AddToFavorite = catchAsync(async (req: any, res: any) => {
  req.body.user = req.user._id;
  const favorite = await Favorite.findOne({
    $and: [{ item: req.body.item }, { user: req.body.user }],
  });
  if (!favorite) {
    const newFavorite = await Favorite.create(req.body);
    return res.json({ favorite: newFavorite });
  } else return res.status(409).json({ message: 'Data already exists' });
});

export const ViewFavorite = catchAsync(async (req: any, res: any) => {
  const favorite = await Favorite.find(req.query);
  res.json({
    items: favorite.length,
    favorite,
  });
});
