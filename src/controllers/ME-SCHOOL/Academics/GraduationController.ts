import { catchAsync } from '../../../shared/catchAsync';

export const GraduateStudents = catchAsync(async (req: any, res: any) => {
  res.json({ message: 'Students are now graduated' });
});
