import user from '../../../../models/user';
import { catchAsync } from '../../../../shared/catchAsync';
import { BOTH_LABEL } from '../../../../utils/labels';
import levelModel from '../level_handler/levelModel';
import Subject from './subjectModel';

export const CreateSubject = catchAsync(async (req: any, res: any) => {
  await Subject.create(req.body);
  res.status(201).json({ message: 'Subject Created' });
});

export const ViewSubjects = catchAsync(async (req: any, res: any) => {
  try {
    let subjects = [];
    if (req.user) {
      if (req.user.role === 'student') {
        //fetch the class of the student
        const level = await levelModel.findOne({ _id: req.user.level });
        subjects = await Subject.find({
          $or: [{ category: 'both' }, { category: level.category }],
        });
      } else {
        const allSubjects = await Subject.find();

        //get all levels
        const allLevels = await levelModel.find();

        for (let i = 0; i < allSubjects.length; i++) {
          const subjectLevel: any = {};
          subjectLevel.subject = allSubjects[i];

          if (allSubjects[i].category === BOTH_LABEL) {
            subjectLevel.levels = allLevels;
          } else {
            subjectLevel.levels = allLevels.filter((levels: any) => {
              return levels.category === allSubjects[i].category;
            });
          }
          subjects.push(subjectLevel);
        }
      }
    } else {
      subjects = await Subject.find();
    }

    res.json({ subjects });
  } catch (error) {
    console.log(error);
  }
});

export const ViewSubject = catchAsync(async (req: any, res: any) => {
  const subject = await Subject.findById(req.params.id);
  res.json({ subject });
});
