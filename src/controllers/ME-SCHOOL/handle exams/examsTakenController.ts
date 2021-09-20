import { catchAsync } from '../../../shared/catchAsync';
import ExamsTaken from './examsTakenModel';

export const TakeExam = catchAsync(async (req: any, res: any) => {
  //check if the user already has an exam bag created
  const user = await ExamsTaken.findOne({ user: req.user._id });

  if (!user) {
    // create the record
    const record = await ExamsTaken.create({ user: req.user._id });
    //update the record
    const data = await ExamsTaken.findOneAndUpdate(
      { _id: record._id },
      { $push: { examsTaken: req.body } }
    );
  } else {
    //otherwise update it
    await ExamsTaken.findOneAndUpdate(
      { _id: user._id },
      { $push: { examsTaken: req.body } }
    );
  }

  res.json({ message: 'success' });
});

export const ViewPapersTaken = catchAsync(async (req: any, res: any) => {
  const papers = await ExamsTaken.findOne({ user: req.user._id });
  res.json({ papers: papers.examsTaken });
});

export const DeletePaperTaken = catchAsync(async (req: any, res: any) => {
  await ExamsTaken.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { examsTaken: { _id: req.params.id } } }
  );
  res.send({ message: 'success' });
});

export const HasTakenPaper = catchAsync(async (req: any, res: any) => {
  const { currentClass, currentTerm, testType, codeName } = req.body;
  const confirm = await ExamsTaken.findOne({
    $and: [
      { user: req.user._id },
      { 'examsTaken.currentClass': currentClass },
      { 'examsTaken.currentTerm': currentTerm },
      { 'examsTaken.testType': testType },
      { 'examsTaken.codeName': codeName },
    ],
  });

  res.json({ data: confirm ? 'true' : 'false' });
});
