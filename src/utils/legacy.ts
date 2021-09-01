// const IsLoggedIn = catchAsync(async (req: any, res: any, next: any) => {
//   //  req.headers.cookie.split('=')[1] ??
//   try {
//     let cookie: string;
//     if (req.headers.cookie) cookie = req.headers.cookie.split('=')[1];
//     else cookie = req.headers.token.split('=')[1];
//     const token: any = await jwt.verify(
//       cookie,
//       process.env.JWT_SECRET || 'in the shadow of his wings'
//     );
//     const { id } = token;
//     const user = await Account.findById(id);
//     req.user = user;
//   } catch (error) {
//     return res.status(401).json({ error });
//   }
//   next();
// });
