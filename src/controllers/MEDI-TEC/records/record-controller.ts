import { catchAsync } from '../../../shared/catchAsync';
import recordModel from './record-model';

export const GET_RECORDS = catchAsync(async (req: any, res: any) => {
  const data = await recordModel.findOne({ patient: req.params.id });
  res.json({ records: data.data });
});

export const REMOVE_RECORD = catchAsync(async (req: any, res: any) => {
  // const data = await recordModel.findOneAndUpdate({patient:})
});
