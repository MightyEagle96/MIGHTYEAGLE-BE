import user from '../../../../models/user';
import { catchAsync } from '../../../../shared/catchAsync';
import Level from './levelModel';

export const CreateLevel = catchAsync(async (req: any, res: any) => {
  console.log(req.body);
  const level = await Level.create(req.body);

  //update the user with the assigned class
  await user.findByIdAndUpdate(req.body.levelTeacher, {
    level: level._id,
  });

  res.status(201).json({ message: 'New class created' });
});

export const ViewLevels = catchAsync(async (req: any, res: any) => {
  const levels = await Level.find().populate('levelTeacher');
  res.json({ levels });
});

export const ViewLevel = catchAsync(async (req: any, res: any) => {
  const level = await Level.findById(req.params.id);
  res.json({ level });
});
