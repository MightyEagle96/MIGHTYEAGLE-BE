import User from '../models/user';
import fs from 'fs';
import { catchAsync } from '../shared/catchAsync';
import path from 'path';

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
 