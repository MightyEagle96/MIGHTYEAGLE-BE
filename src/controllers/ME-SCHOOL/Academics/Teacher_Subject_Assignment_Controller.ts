import Teacher_Subject_Assignment_Model from '../../../models/Academics/Teacher_Subject_Assignment_Model';
import { catchAsync } from '../../../shared/catchAsync';
import { BOTH_LABEL } from '../../../utils/labels';
import levelModel from '../Admin/level_handler/levelModel';
import subjectModel from '../Admin/subjects/subjectModel';

//register combination of subjects and class

export const AvailableSubjectsWithClasses = catchAsync(
  async (req: any, res: any) => {
    const subjects = await subjectModel.find();
    const whoIsAssignedToWhat = await Teacher_Subject_Assignment_Model.find();

    let combination = [];

    for (let i = 0; i < subjects.length; i++) {
      const subject: any = {};

      subject.subjectId = subjects[i]._id;
      subject.title = subjects[i].title;

      //in case where category is both

      if (subjects[i].category === BOTH_LABEL) {
        subject.levels = await levelModel.find();
      } else {
        subject.levels = await levelModel.find({
          category: subjects[i].category,
        });
      }

      combination.push(subject);
    }

    res.json({ combination });
  }
);

export const PostSubjectClassAssignment = catchAsync(
  async (req: any, res: any) => {
    req.body.teacher = req.user._id;

    const assignments = await Teacher_Subject_Assignment_Model.find({
      teacher: req.user._id,
    });

    if (assignments.length === 0) {
      await Teacher_Subject_Assignment_Model.create(req.body);
    } else {
      await Teacher_Subject_Assignment_Model.findOneAndUpdate(
        { _id: assignments[0]._id },
        { subjectAndLevel: [] }
      );

      await Teacher_Subject_Assignment_Model.findOneAndUpdate(
        { _id: assignments[0]._id },
        { $push: { subjectAndLevel: req.body.subjectAndLevel } }
      );
    }

    res.status(201).json({ message: 'Success' });
  }
);

export const WhoIsAssignedToWhat = catchAsync(async (req: any, res: any) => {
  const whoIsAssignedToWhat = await Teacher_Subject_Assignment_Model.find(
    req.query
  ).populate([
    {
      path: 'subjectAndLevel',
      populate: { path: 'subject', model: 'Subject' },
    },
    {
      path: 'subjectAndLevel',
      populate: { path: 'level', model: 'Level' },
    },
  ]);

  res.json({ whoIsAssignedToWhat });
});
