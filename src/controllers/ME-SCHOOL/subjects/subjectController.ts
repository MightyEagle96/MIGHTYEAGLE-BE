import { catchAsync } from '../../../shared/catchAsync';
import Subject from './subjectModel';

export const CreateSubject = catchAsync(async (req: any, res: any) => {
  await Subject.create(req.body);
  res.status(201).json({ message: 'done' });
});

export const ViewSubjects = catchAsync(async (req: any, res: any) => {
  const subjects = await Subject.find();
  res.send({ subjects });
});
