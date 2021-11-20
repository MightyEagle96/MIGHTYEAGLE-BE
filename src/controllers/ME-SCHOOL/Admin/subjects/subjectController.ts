import user from '../../../../models/user';
import { catchAsync } from '../../../../shared/catchAsync';
import levelModel from '../level handler/levelModel';
import Subject from './subjectModel';

export const CreateSubject = catchAsync(async (req: any, res: any) => {
  await Subject.create(req.body);
  res.status(201).json({ message: 'Subject Created' });
});

export const ViewSubjects = catchAsync(async (req: any, res: any) => {
  try {
    let subjects;
    // const userData = await user
    //   .findById(req.user._id)
    //   .populate(['currentTerm', 'level', 'currentSession']);
    if(req.user){
      if (req.user.role === 'student') {
        //fetch the class of the student
        const level = await levelModel.findOne({ _id: req.user.level });
        if (
          level.level === 'Jss1' ||
          level.level === 'Jss2' ||
          level.level === 'Jss3'
        ) {
          subjects = await Subject.find({
            $or: [{ category: 'both' }, { category: 'junior' }],
          });
        } else {
          subjects = await Subject.find({
            $or: [{ category: 'both' }, { category: 'senior' }],
          });
        }
      } 
      else {
        subjects = await Subject.find();
      }
    }
 
  else {
      subjects = await Subject.find();
    }

    res.json({  subjects });
  } catch (error) {
    console.log(error);
  }
});

export const ViewSubject = catchAsync(async (req: any, res: any) => {
  const subject = await Subject.findById(req.params.id);
  res.json({ subject });
});
