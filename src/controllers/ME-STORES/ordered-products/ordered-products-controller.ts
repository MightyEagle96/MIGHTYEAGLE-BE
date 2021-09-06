import { catchAsync } from '../../../shared/catchAsync';
import OrderedProducts from './ordered-products-model';
import Store from '../store-management/store-management-model';

export const CreateOrder = catchAsync(async (req: any, res: any) => {
  //update the product in the database
  const { quantity } = await Store.findOne({ _id: req.body.product });
  const remainder = quantity - req.body.quantity;
  if (remainder > 0) {
    await Store.findOneAndUpdate(
      { _id: req.body.product },
      { quantity: remainder }
    );
  }
  if (remainder < 1) {
    await Store.findOneAndUpdate(
      { _id: req.body.product },
      { quantity: remainder, out_of_stock: true }
    );
  }
  //create a new order
  req.body.user = req.user._id;
  const product = await OrderedProducts.create(req.body);
  res.json({ product });
});

export const ViewOrders = catchAsync(async (req: any, res: any) => {
  const orders = await OrderedProducts.find(req.query).populate('product');
  res.json({ orders });
});
