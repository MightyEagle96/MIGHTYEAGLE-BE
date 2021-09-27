import { catchAsync } from '../../../../shared/catchAsync';
import levelModel from '../level handler/levelModel';
import Subject from './subjectModel';

export const CreateSubject = catchAsync(async (req: any, res: any) => {
  await Subject.create(req.body);
  res.status(201).json({ message: 'done' });
});

export const ViewSubjects = catchAsync(async (req: any, res: any) => {
  if (req.user.role === 'student') {
    //fetch the class of the student
    const level = await levelModel.findOne({ _id: req.user.level });

    if (
      level.level === 'Jss1' ||
      level.level === 'Jss2' ||
      level.level === 'Jss3'
    ) {
      const subjects = await Subject.find({
        $or: [{ category: 'both' }, { category: 'junior' }],
      });
      res.send({ subjects });
    } else {
      const subjects = await Subject.find({
        $or: [{ category: 'both' }, { category: 'senior' }],
      });
      res.send({ subjects });
    }
  } else {
    const subjects = await Subject.find();
    res.send({ subjects });
  }
});

export const ViewSubject = catchAsync(async (req: any, res: any) => {
  const subject = await Subject.findById(req.params.id);
  res.json({ subject });
});
