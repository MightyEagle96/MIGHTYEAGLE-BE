import { catchAsync } from '../../../shared/catchAsync';
import Question from './questionModel';

//to create a question
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

//to view the list of questions
export const ViewQuestions = catchAsync(async (req: any, res: any) => {
  const result = await Question.find(req.query).populate([
    'currentClass',
    'testType',
    'subject',
    'currentTerm',
  ]);
  let questions = result[0];
  const count = questions.questions.length;
  res.json({ count, questions: questions });
});

//to view a single question
export const ViewQuestion = catchAsync(async (req: any, res: any) => {
  const { collectionId, questionId } = req.params;

  const { questions } = await Question.findOne({ _id: collectionId });

  const question = questions.find((q: any) => {
    return q._id.toString() === questionId.toString();
  });

  res.json({ question });
});

//to update a question
export const UpdateQuestion = catchAsync(async (req: any, res: any) => {
  //to update a question. You need the id of the question and the id of the collection
  const { collectionId, questionId } = req.params;

  await Question.updateOne(
    { _id: collectionId, 'questions._id': questionId },
    {
      $set: {
        'questions.$.question': req.body.question,
        'questions.$.optionA': req.body.optionA,
        'questions.$.optionB': req.body.optionB,
        'questions.$.optionC': req.body.optionC,
        'questions.$.optionD': req.body.optionD,
        'questions.$.correctAns': req.body.correctAns,
      },
    }
  );

  res.json({ message: 'done' });
});

//to delete question
export const DeleteQuestion = catchAsync(async (req: any, res: any) => {
  //to delete a question, you need the id of the question and the id of the collection
  await Question.findOneAndUpdate(
    { _id: req.params.id },
    { $pull: { questions: { _id: req.body.questionId } } }
  );
  res.json({ message: 'done' });
});

export const SetTimer = catchAsync(async (req: any, res: any) => {
  //const body ={duration}
});
