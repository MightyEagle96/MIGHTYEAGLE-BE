import { catchAsync } from '../../../shared/catchAsync';
import Store from './store-management-model';

export const CreateItem = catchAsync(async (req: any, res: any) => {
  req.body.addedBy = req.user._id;
  const item = await Store.create(req.body);
  res.json({ item });
});

export const EditItem = catchAsync(async (req: any, res: any) => {
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
