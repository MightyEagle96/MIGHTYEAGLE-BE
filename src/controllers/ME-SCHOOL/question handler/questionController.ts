import { catchAsync } from '../../../shared/catchAsync';
import Question from './questionModel';

export const CreateQuestion = catchAsync(async (req: any, res: any) => {
  const { currentClass, currentTerm, subject, testType } = req.body;

  const question = await Question.findOne({
    $and: [
      { currentClass: currentClass },
      { currentTerm: currentTerm },
      { subject: subject },
      { testType: testType },
    ],
  });

  if (!question) {
    const createdQuestion = await Question.create({
      currentClass: currentClass,
      currentTerm: currentTerm,
      subject: subject,
      testType: testType,
    });

    await Question.findOneAndUpdate(
      { _id: createdQuestion._id },
      { $push: { questions: req.body } }
    );
  } else {
    await Question.findOneAndUpdate(
      { _id: question._id },
      { $push: { questions: req.body } }
    );
  }
  res.status(201).json({ message: 'done' });
});

export const ViewQuestions = catchAsync(async (req: any, res: any) => {
  const questions = await Question.find(req.query).populate([
    'currentClass',
    'testType',
    'subject',
  ]);
  res.json({ count: questions.length, questions });
});
