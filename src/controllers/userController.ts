import User from '../models/user';
import fs from 'fs';
import { catchAsync } from '../shared/catchAsync';

export const GET_USER = catchAsync(async (req: any, res: any) => {
  const user = await User.findById(req.params.id);
  return res.json({ user });
});

export const UPLOAD_PHOTO = catchAsync(async (req: any, res: any) => {
  console.log(req.file);
  fs.rename(
    `public/images/${req.file.filename}`,
    `public/images/${req.user._id}-photo.${req.file.mimetype.split('/')[1]}`,
    () => {
      console.log('Image saved');
    }
  );

  res.json({ message: 'image uploaded' });
});
