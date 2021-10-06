import { catchAsync } from '../../../shared/catchAsync';
import Result from './resultModel';

export const PostResult = catchAsync(async (req: any, res: any) => {
  //first of all create the result file

  try {
    const result = await Result.findOne({
      user: req.user._id,
      level: req.user.level,
      currentTerm: req.user.currentTerm,
      currentSession: req.user.currentSession,
      subject: req.body.subject,
    });

    if (!result) {
      const newResult = await Result.create({
        user: req.user._id,
        level: req.user.level,
        currentTerm: req.user.currentTerm,
        currentSession: req.user.currentSession,
        subject: req.body.subject,
      });
      await Result.findOneAndUpdate(
        { _id: newResult._id },
        { $push: { results: req.body } }
      );
    } else {
      await Result.findOneAndUpdate(
        { _id: result._id },
        { $push: { results: req.body } }
      );
    }

    res.json({ message: 'Updated' });
  } catch (error) {
    console.log(error);
  }
});

export const ViewResult = catchAsync(async (req: any, res: any) => {
  /**
   * THIS WILL PULL RESULTS BY THE CURRENT TERM AND SESSION
   */
  try {
    const termResults = [];
    const results = await Result.find({
      user: req.user._id,
      level: req.user.level,
      currentTerm: req.user.currentTerm,
      currentSession: req.user.currentSession,
    }).populate(['subject', 'results.testType']);
    /**
     * Subject:
     * First CA:0
     */

    for (let i = 0; i < results.length; i++) {
      const body: { subject: ''; results: any[] } = {
        subject: '',
        results: [],
      };
      const resultScores = results[i].results;
      body.subject = results[i].subject.title;

      for (let k = 0; k < resultScores.length; k++) {
        body.results.push({
          testType: resultScores[k].testType.testType,
          score: resultScores[k].score,
        });
      }
      termResults.push(body);
    }
    res.json({ termResults });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'error happened' });
  }
});
