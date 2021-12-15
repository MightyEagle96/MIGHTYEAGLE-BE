import { catchAsync } from '../../../../shared/catchAsync';
import { randomizeQuestions } from '../../../../utils/services';
import Question from './questionModel';
import fs from 'fs';
import { parse } from 'csv-parse';

//to create a question
export const CreateQuestion = catchAsync(async (req: any, res: any) => {
  if (req.file) {
    //this is coming from the query
    const { currentClass, currentTerm, subject, testType } = req.query;

    const ext = req.file.originalname.split('.')[1];
    const newFileName = `file-${Date.now()}.${ext}`;

    fs.rename(req.file.path, `public/documents/${newFileName}`, () => {});

    const question = await Question.findOne({
      $and: [
        { currentClass: currentClass },
        { currentTerm: currentTerm },
        { subject: subject },
        { testType: testType },
      ],
    });
    const parser = parse({ columns: true }, async (err, records) => {}).on(
      'data',
      async (data) => {
        await Question.findOneAndUpdate(
          { _id: question._id },
          { $push: { questions: data } }
        );
      }
    );

    fs.createReadStream(`public/documents/${newFileName}`).pipe(parser);
  } else {
    //if we are not uploading via a file
    const { currentClass, currentTerm, subject, testType } = req.body;

    const question = await Question.findOne({
      $and: [
        { currentClass: currentClass },
        { currentTerm: currentTerm },
        { subject: subject },
        { testType: testType },
      ],
    });

    await await Question.findOneAndUpdate(
      { _id: question._id },
      { $push: { questions: req.body } }
    );
  }

  res.status(201).json({ message: 'done' });
});

//to view the list of questions
export const ViewQuestions = catchAsync(async (req: any, res: any) => {
  try {
    const result = await Question.find(req.query).populate([
      'currentClass',
      'testType',
      'subject',
      'currentTerm',
    ]);
    if (result) {
      let questions = result[0];

      //to randomise the questions field for student's alone
      if (req.user.role === 'student') {
        questions.questions = randomizeQuestions(
          questions.questions,
          questions.questions.length
        );
      }

      const count = questions.questions.length;
      res.json({ count, questionId: questions._id, questions: questions });
    }
  } catch (error) {
    // this line here is to create a question record on first view
    //restrict this to only teachers and class teachers

    if (req.user.role === 'class teacher' || req.user.role === 'teacher') {
      const createdQuestion = await Question.create(req.query);
      res.json({
        count: 0,
        questionId: createdQuestion._id,
        questions: { questions: [] },
      });
    } else {
      res.json({
        count: 0,
        questions: { questions: [] },
      });
    }
  }
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
  try {
    const { collectionId } = req.params;
    const totalDuration =
      req.body.hour * 60 * 60 * 1000 + req.body.minute * 60 * 1000;
    await Question.findOneAndUpdate(
      { _id: collectionId },
      { duration: totalDuration }
    );

    res.json({ message: 'Duration Updated' });
  } catch (error) {
    console.log(error);
  }
});

export const ToggleActivation = catchAsync(async (req: any, res: any) => {
  try {
    const { collectionId } = req.params;

    const question = await Question.findById(collectionId);

    await Question.findOneAndUpdate(
      { _id: collectionId },
      {
        activated: !question.activated,
      }
    );

    res.json({ message: 'Done' });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

export const SetDivisor = catchAsync(async (req: any, res: any) => {
  try {
    const { collectionId } = req.params;

    const question = await Question.findById(collectionId);

    await Question.findOneAndUpdate(
      { _id: collectionId },
      {
        divisor: req.body.divisor,
      }
    );

    res.json({ message: 'Done' });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});
