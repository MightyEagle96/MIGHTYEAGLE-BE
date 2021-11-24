import { catchAsync } from '../../../shared/catchAsync';
import SubjectsRegister from './subjectsRegister';

export const RegisterSubjects = catchAsync(async (req: any, res: any) => {
  try {
    console.log(req.body);
    req.body.user = req.user._id;

    const data = await SubjectsRegister.create({
      user: req.user._id,
      level: req.user.level,
      currentTerm: req.user.currentTerm,
      session: req.user.currentSession,
    });

    for (let i = 0; i < req.body.length; i++) {
      await SubjectsRegister.findOneAndUpdate(
        {
          _id: data._id,
        },
        { $push: { subjects: { subject: req.body[i]._id } } }
      );
    }

    res.status(201).json({ message: 'Subjects registered' });
  } catch (error) {
    console.log(error);

    res.json({ message: 'Error dey, we dey come' });
  }
});

export const ViewRegisteredSubjects = catchAsync(async (req: any, res: any) => {
  const registeredSubjects = await SubjectsRegister.findOne({
    session: req.user.currentSession,
    level: req.user.level,
    currentTerm: req.user.currentTerm,
    user: req.user._id,
  })
    .populate({ path: 'subjects.subject' })
    .populate(['level', 'currentTerm', 'session']);

  if (registeredSubjects) res.json({ registeredSubjects });
  else res.json({ registeredSubjects: [] });
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
