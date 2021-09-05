import { catchAsync } from '../../../shared/catchAsync';
import OrderedProducts from './ordered-products-model';

export const CreateOrder = catchAsync(async (req: any, res: any) => {
  req.body.user = req.user._id;
  const product = await OrderedProducts.create(req.body);
  res.json({ product });
});
