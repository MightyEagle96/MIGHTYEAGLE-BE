import { catchAsync } from '../../../shared/catchAsync';
import Cart from './cart-model';

export const AddToCart = catchAsync(async (req: any, res: any) => {
  req.body.user = req.user._id;
  const cart = await Cart.findOne({
    $and: [{ item: req.body.item }, { user: req.body.user }],
  });
  if (!cart) {
    const newCart = await Cart.create(req.body);
    return res.json({ cart: newCart });
  } else return res.status(409).json({ message: 'Data already exists' });
});

export const ViewCart = catchAsync(async (req: any, res: any) => {
  const cart = await Cart.find(req.query).populate('item');
  res.json({
    items: cart.length,
    cart,
  });
});

export const RemoveFromCart = catchAsync(async (req: any, res: any) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: 'done' });
});
