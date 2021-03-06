import { catchAsync } from '../../../shared/catchAsync';
import Store from './store-management-model';
import OrderedProducts from '../ordered-products/ordered-products-model';

export const CreateItem = catchAsync(async (req: any, res: any) => {
  req.body.addedBy = req.user._id;
  req.body.price *= 100; //to convert it to kobo
  const item = await Store.create(req.body);
  res.json({ item });
});

export const EditItem = catchAsync(async (req: any, res: any) => {
  //to set back out of stock to false
  if (req.body.quantity < 1) req.body.out_of_stock = true;
  if (req.body.quantity >= 1) req.body.out_of_stock = false;
  const item = await Store.findByIdAndUpdate(req.params.id, req.body);
  res.json({ item });
});

export const GetItems = catchAsync(async (req: any, res: any) => {
  const items = await Store.find().populate('addedBy', { fullName: 1 });
  res.json({ items });
});

export const GetItem = catchAsync(async (req: any, res: any) => {
  const item = await Store.findById(req.params.id);
  res.json({ item });
});

export const DeleteItem = catchAsync(async (req: any, res: any) => {
  const items = await Store.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

export const ViewTransactions = catchAsync(async (req: any, res: any) => {
  const filter = { amount: { $gte: 1 } };
  const products = await OrderedProducts.aggregate([
    { $match: filter },
    { $group: { _id: '$_id', total: { $sum: '$amount' } } },
  ]);

  function getTotal() {
    let totalAmount: number = 0;
    products.map((product: any) => {
      totalAmount += product.total;
    });
    return totalAmount;
  }
  const orders = await OrderedProducts.find()
    .populate('product')
    .populate('user');
  const total = getTotal();

  res.json({ total, orders });
});

export const OrdersCount = catchAsync(async (req: any, res: any) => {
  const orders = await OrderedProducts.find();
  const products = await Store.find();
  res.json({ orders: orders.length, products: products.length });
});
