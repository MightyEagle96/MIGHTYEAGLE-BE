import { catchAsync } from '../../../shared/catchAsync';
import StoreManager from '../../../models/store/storeModel';

export const CreateProduct = catchAsync(async (req: any, res: any) => {
  await StoreManager.create(req.body);
  res.json({ message: 'Product created' });
});

export const ViewProducts = catchAsync(async (req: any, res: any) => {
  const products = await StoreManager.find(req.query);
  res.json({ products });
});
