import User from '../models/user';
import fs from 'fs';
import { catchAsync } from '../shared/catchAsync';
import path from 'path';
export const GET_USER = catchAsync(async (req: any, res: any) => {
  const user = await User.findById(req.params.id);
  return res.json({ user });
});

export const UPLOAD_PHOTO = catchAsync(async (req: any, res: any) => {
  console.log(req.file);
  const filePath = `public/images/${req.user._id}-photo.${
    req.file.mimetype.split('/')[1]
  }`;

  fs.rename(`public/images/${req.file.filename}`, filePath, async () => {
    await User.findByIdAndUpdate(req.user._id, {
      imageUrl: path.resolve(filePath),
    });
  });

  res.json({ message: 'image uploaded' });
});

export const GET_PATH = catchAsync(async (req: any, res: any) => {
  const filePath = 'public/images/614ac6846da600243253f2e0-photo.jpeg';

  const fullPath = path.resolve(filePath);
  const image = path.basename(filePath);

  console.log(path.resolve(filePath));
  res.json({ fullPath, image });
});
