import jambCenterModel from '../../models/jamb/jambCenterModel';
import { catchAsync } from '../../shared/catchAsync';

export const CreateCenter = catchAsync(async (req: any, res: any) => {
  await jambCenterModel.create(req.body);

  res.json({ message: 'New center created' });
});

export const GetCenters = catchAsync(async (req: any, res: any) => {
  const jambCenters = await jambCenterModel.find();
  res.json({ jambCenters });
});

export const GetCenter = catchAsync(async (req: any, res: any) => {
  const jambCenter = await jambCenterModel.findById(req.params.centerId);
  res.json({ jambCenter });
});
