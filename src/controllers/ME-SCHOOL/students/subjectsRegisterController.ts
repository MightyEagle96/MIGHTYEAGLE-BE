import { catchAsync } from '../../../shared/catchAsync';
import SubjectsRegister from './subjectsRegister';

export const RegisterSubjects = catchAsync(async (req: any, res: any) => {
  req.body.user = req.user._id;
  const register = await SubjectsRegister.findOne({
    user: req.user._id,
    level: req.user.level,
    currentTerm: req.user.currentTerm,
    session: req.user.currentSession,
  });

  if (register) {
    for (let i = 0; i < req.body.subjects.length; i++) {
      await SubjectsRegister.findOneAndUpdate(
        { _id: register._id },
        { $push: { subjects: { subject: req.body.subjects[i] } } }
      );
    }
  } else {
    const data = await SubjectsRegister.create({
      user: req.user._id,
      level: req.user.level,
      currentTerm: req.user.currentTerm,
      session: req.user.currentSession,
    });

    for (let i = 0; i < req.body.subjects.length; i++) {
      await SubjectsRegister.findOneAndUpdate(
        {
          _id: data._id,
        },
        { $push: { subjects: { subject: req.body.subjects[i] } } }
      );
    }
  }

  res.status(201).json({ message: 'Subjects registered' });
});

export const ViewRegisteredSubjects = catchAsync(async (req: any, res: any) => {
  const registeredSubject = await SubjectsRegister.findOne({
    session: req.user.currentSession,
    level: req.user.level,
    currentTerm: req.user.currentTerm,
    user: req.user._id,
  })
    .populate({ path: 'subjects.subject' })
    .populate(['level', 'currentTerm', 'session']);

  if (registeredSubject) res.json({ registeredSubject });
  else res.json({ registeredSubject: [] });
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
