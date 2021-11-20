import user from '../../../../models/user';
import { catchAsync } from '../../../../shared/catchAsync';

export const ViewUsers = catchAsync(async (req: any, res: any) => {
  try {
    let users;
    let length = 0;

    if (req.query.filter === 'ytba') {
      const newQuery: any = {};
      newQuery.account_type = req.query.account_type;
      newQuery.role = req.query.role;
      newQuery.level = null;
      console.log(newQuery);

      users = await user.find(newQuery);
      length = users.length;
    } else {
      users = await user.find(req.query);
      length = users.length;
    }
    res.json({ length, users });
  } catch (error) {
    console.log(error);
    res.json({ message: 'yawa don gas' });
  }
});
