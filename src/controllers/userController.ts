import User from '../models/user';
import fs from 'fs';
import { catchAsync } from '../shared/catchAsync';
import path from 'path';
import { ACCOUNT_LABEL } from '../utils/labels';
import user from '../models/user';
import sessionModel from './ME-SCHOOL/Admin/session handler/sessionModel';
import termModel from './ME-SCHOOL/Admin/termHandler/termModel';

export const GET_USER = catchAsync(async (req: any, res: any) => {
  const user = await User.findById(req.user._id);
  return res.json({ user });
});

export const UPLOAD_PHOTO = catchAsync(async (req: any, res: any) => {
  const filePath = `public/images/${req.user._id}-${Date.now()}.${
    req.file.mimetype.split('/')[1]
  }`;

  fs.rename(`public/images/${req.file.filename}`, filePath, async () => {
    await User.findByIdAndUpdate(req.user._id, {
      imageUrl: path.basename(filePath),
    });
  });

  res.json({ message: 'image uploaded' });
});

export const CREATE_USER = catchAsync(async (req: any, res: any) => {
  //if the the account is or me-school do the following
  try {
    if (req.body.account_type == ACCOUNT_LABEL.me_school) {
      const currentSession = await sessionModel.findOne({
        activeSession: true,
      });
      const currentTerm = await termModel.findOne({ activeTerm: true });

      req.body.currentSession = currentSession._id;
      req.body.currentTerm = currentTerm._id;
    }
    await User.create(req.body);
    res.json({ message: `New ${req.body.role} created` });
  } catch (error) {
    console.log(error);
  }
});
