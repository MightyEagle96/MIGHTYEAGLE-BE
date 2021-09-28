import { catchAsync } from '../../../shared/catchAsync';
import SubjectsRegister from './subjectsRegister';

export const RegisterSubjects = catchAsync(async (req: any, res: any) => {
  req.body.user = req.user._id;
  const register = await SubjectsRegister.findOne({
    user: req.user._id,
    level: req.user.level,
    currentTerm: req.user.currentTerm,
    session: req.user.session,
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
      currentTerm: req.body.currentTerm,
      session: req.body.session,
    });

    await SubjectsRegister.findOneAndUpdate(
      {
        _id: data._id,
      },
      { $push: { subjects: req.body } }
    );
  }

  res.status(201).json({ message: 'Subjects registered' });
});

export const ViewRegisteredSubjects = catchAsync(async (req: any, res: any) => {
  const registeredSubject = await SubjectsRegister.findOne({
    ...req.query,
    user: req.user._id,
  })
    .populate({ path: 'subjects.subject' })
    .populate(['level', 'currentTerm', 'session']);

  res.json({ registeredSubject });
});

export const DeleteRegisteredSubject = catchAsync(
  async (req: any, res: any) => {
    await SubjectsRegister.findOneAndUpdate(
      { _id: req.body.registerId },
      { $pull: { subjects: { _id: req.body.subjectId } } }
    );
    res.json({ message: 'done' });
  }
);
