import User from '../../../models/user';
import { catchAsync } from '../../../shared/catchAsync';

export const AssignClassToTeacher = catchAsync(async (req: any, res: any) => {
  res.send('Hello ooo');
});
