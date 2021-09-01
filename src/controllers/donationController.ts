import Donation, { IDonation } from '../models/donation';
import { catchAsync } from '../shared/catchAsync';

//make a donation
export const MakeDonation = catchAsync(async (req: any, res: any) => {
  const cause = req.params.causeId;
  const { _id } = req.user;
  const { amountDonated } = req.body;

  const newDonation = {
    donor: _id,
    amountDonated,
  };

  const donation = await Donation.findOneAndUpdate(
    { cause },
    { $push: { donations: newDonation } }
  );
  //const donation = await Donation.findOne({ cause });

  res.send(donation);
});
