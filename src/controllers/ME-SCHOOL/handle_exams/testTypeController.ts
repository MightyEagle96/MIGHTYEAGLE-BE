import { catchAsync } from '../../../shared/catchAsync';
import TestType from './testTypeModel';

export const CreateTestType = catchAsync(async (req: any, res: any) => {
  await TestType.create(req.body);
  res.json({ message: 'done' });
});

export const ViewTestTypes = catchAsync(async (req: any, res: any) => {
  const testTypes = await TestType.find();
  res.json({ testTypes });
});
