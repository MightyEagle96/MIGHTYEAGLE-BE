import { catchAsync } from '../../../shared/catchAsync';
import SubjectsRegister from './subjectsRegister';

export const RegisterSubjects = catchAsync(async (req: any, res: any) => {
  req.body.user = req.user._id;
  const register = await SubjectsRegister.findOne({
    user: req.body.user,
    level: req.body.level,
  });

  if (register) {
    await SubjectsRegister.findOneAndUpdate(
      { _id: register._id },
      { $push: { subjects: req.body } }
    );
  } else {
    const data = await SubjectsRegister.create({
      user: req.body.user,
      level: req.body.level,
    });

    await SubjectsRegister.findOneAndUpdate(
      {
        _id: data._id,
      },
      { $push: { subjects: req.body } }
    );
  }

  res.status(201).json({ message: 'success' });
});

export const ViewRegisteredSubjects = catchAsync(async (req: any, res: any) => {
  const registeredSubject = await SubjectsRegister.findOneAndUpdate({
    user: req.user._id,
    level: req.user.level,
  }).populate({ path: 'subjects.subject' });

  res.json({ registeredSubject });
});
