import { catchAsync } from '../../../shared/catchAsync';
import ExamsTaken from './examsTakenModel';

export const RegisterStudentWithPaper = catchAsync(
  async (req: any, res: any) => {
    req.body.user = req.user._id;
    await ExamsTaken.create(req.body);

    res.json({ message: 'Done' });
  }
);

export const HasTakenPaper = catchAsync(async (req: any, res: any) => {
  const confirm = await ExamsTaken.findOne({
    $and: [{ user: req.user._id }, { paper: req.params.paperId }],
  });

  if (confirm) res.json({ hasTaken: true });
  else res.json({ hasTaken: false });
});

export const StudentsWhoHaveTakenPaper = catchAsync(
  async (req: any, res: any) => {
    const students = await ExamsTaken.find(req.query).populate([
      'user',
      'paper',
    ]);

    res.json({ students });
  }
);

export const DeletePaperTaken = catchAsync(async (req: any, res: any) => {
  await ExamsTaken.findByIdAndDelete(req.params.id);

  res.json({ message: 'done' });
});
