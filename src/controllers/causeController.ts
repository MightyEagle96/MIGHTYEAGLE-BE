import Cause from '../models/cause';
import Donation, { ICauseInput, IDonation } from '../models/donation';
import { catchAsync } from '../shared/catchAsync';

export const CreateCause = catchAsync(async (req: any, res: any) => {
  const cause = await Cause.create(req.body);
  await Donation.create({ cause: cause._id });
  console.log(cause);
  res.status(201).json({ success: 'Cause Created' });
});

export const GetCauses = catchAsync(async (req: any, res: any) => {
  const causes = await Cause.find();
  res.status(200).json({ causes });
});

export const GetCause = catchAsync(async (req: any, res: any) => {
  const cause = await Cause.findById(req.params.id);
  res.status(200).json({ cause });
});

export const UpdateCause = catchAsync(async (req: any, res: any) => {
  //await Cause.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).send('Updated');
});
