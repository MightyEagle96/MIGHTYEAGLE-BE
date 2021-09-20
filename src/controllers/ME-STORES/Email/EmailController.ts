import { catchAsync } from '../../../shared/catchAsync';

export const SendEmail = catchAsync((req: any, res: any) => {
  res.send('success oo');
});
