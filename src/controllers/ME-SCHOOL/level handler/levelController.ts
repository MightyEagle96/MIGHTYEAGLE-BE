import { catchAsync } from '../../../shared/catchAsync';
import Level from './levelModel';

export const CreateLevel = catchAsync(async (req: any, res: any) => {
  await Level.create(req.body);
  res.status(201).json({ message: 'done' });
});

export const ViewLevels = catchAsync(async (req: any, res: any) => {
  const levels = await Level.find();
  res.json({ levels });
});