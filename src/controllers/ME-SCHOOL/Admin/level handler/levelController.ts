import { catchAsync } from '../../../../shared/catchAsync';
import Level from './levelModel';

export const CreateLevel = catchAsync(async (req: any, res: any) => {
  await Level.create(req.body);
  res.status(201).json({ message: 'New class created' });
});

export const ViewLevels = catchAsync(async (req: any, res: any) => {
  const levels = await Level.find();
  res.json({ levels });
});

export const ViewLevel = catchAsync(async (req: any, res: any) => {
  const level = await Level.findById(req.params.id);
  res.json({ level });
});
