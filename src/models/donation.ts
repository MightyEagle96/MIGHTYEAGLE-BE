import mongoose, { Schema, model, Document } from 'mongoose';
import { CauseDocument } from './cause';

import { UserDocument } from './user';

export interface ICauseInput extends Document {
  donor?: UserDocument['_id'];
  cause: CauseDocument['_id'];
  amountDonated?: number;
}

export interface IDonation extends ICauseInput {
  donation: {
    donor: ICauseInput['donor'];
    amountDonated: ICauseInput['amountDonated'];
  };
}

const donationSchema = new Schema({
  cause: {
    type: Schema.Types.ObjectId,
  },
  donations: [{ donor: Schema.Types.ObjectId, amountDonated: Number }],
});

const Donation = model('Donation', donationSchema);
export default Donation;
