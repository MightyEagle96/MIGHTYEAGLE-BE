import mongoose, { Schema, model, Document } from 'mongoose';

export interface CauseDocument extends Document {
  causeTitle: string;
  targetAmount: number;
  raisedAmount: number;
  cardImg: string;
  cardText: string;
  causeDescription: string;
  bannerImg: string;
  subImgs: [];
  createdAt: string;
}

const causeSchema = new Schema({
  causeTitle: {
    type: String,
    unique: [true, 'A cause with this same title exists'],
  },
  targetAmount: Number,
  raisedAmount: Number,
  cardImg: String,
  cardText: String,
  linkText: { type: String, default: 'Donate for this cause now' },
  causeDescription: String,
  bannerImg: String,
  subImgs: Array,
  createdAt: { type: String, default: new Date().toLocaleDateString() },
});

const Cause = model<CauseDocument>('Cause', causeSchema);
export default Cause;
