import user from '../../../models/user';
import { catchAsync } from '../../../shared/catchAsync';
import subjectsRegister from '../students/subjectsRegister';

export const StudentsOfferingMySubjects = catchAsync(
  async (req: any, res: any) => {
    //Get the class Id and the subject Id

    //get the array of the students in that class

    const students = await user.find({
      $and: [{ role: 'student' }, { level: req.query.level }],
    });

    let studentsOfferingMySubject: any = [];
    try {
      if (students.length > 0) {
        for (let i = 0; i < students.length; i++) {
          const register = await subjectsRegister.findOne({
            user: students[i]._id,
          });
          if (register) {
            for (let j = 0; j < register.subjects.length; j++) {
              if (
                register.subjects[j].subject.toString() ===
                req.query.subject.toString()
              ) {
                studentsOfferingMySubject.push(students[i]);
              }
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
    res.json({ studentsOfferingMySubject });
  }
);
