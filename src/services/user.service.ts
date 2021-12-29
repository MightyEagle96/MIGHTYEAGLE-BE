import { verify } from 'jsonwebtoken';
import User from '../models/user';
import { catchAsync } from '../shared/catchAsync';
import isAuth from '../utils/isAuth';
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
  sendAccessToken,
} from '../utils/tokens';

export const GetUsers = catchAsync(async (req: any, res: any) => {
  const users = await User.find();
  res.json({ users });
});

export const SignUp = catchAsync(async (req: any, res: any) => {
  if (!req.body.email)
    return res.status(400).json({ message: 'Email is required' });
  if (!req.body.password)
    return res.status(400).json({ message: 'Password is required' });
  const user = await User.create(req.body);

  const accessToken = createAccessToken({ id: user._id });
  const refreshToken = createRefreshToken({ id: user._id });
  user.refreshToken = refreshToken;
  sendRefreshToken(res, refreshToken);
  sendAccessToken(user, req, res, accessToken);

  res.send('done');
});

export const Login = catchAsync(async (req: any, res: any) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).populate([
    'currentSession',
    'level',
    'currentTerm',
  ]);

  //if there is no user
  if (!user)
    return res.status(401).json({ message: 'Incorrect Email or Password' });

  if (await user.comparePasswords(password)) {
    const accessToken = createAccessToken({ id: user._id });
    const refreshToken = createRefreshToken({ id: user._id });
    await User.findByIdAndUpdate(user._id, {
      refreshToken: refreshToken,
    });
    sendRefreshToken(res, refreshToken);
    sendAccessToken(user, req, res, accessToken);
  } else
    return res.status(401).json({ message: 'Incorrect Email or Password' });
});

export const IsLoggedIn = catchAsync(async (req: any, res: any, next: any) => {
  try {
    const userId = isAuth(req, res);

    if (userId !== null) {
      const user = await User.findById(userId);
      req.user = user;
    }
  } catch (error) {
    return res.status(401).json({ message: 'invalid token' });
  }
  next();
});

export const RefreshToken = catchAsync(async (req: any, res: any) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.send({ accessToken: '' });

  let payload: any = null;
  try {
    payload = verify(
      token,
      process.env.REFRESH_TOKEN_SECRET ||
        'i-love-the-lord-and-if-loving-him-is-wrong-then-i-dont-wanna-be-right'
    );
  } catch (error) {
    return res.send({ accessToken: '' });
  }
  //token is valid
  const user = await User.findById(payload.id);

  if (!user) return res.send({ accessToken: 'rgrgrgrgr' });

  //user exists, confirm refreshToken
  if (user.refreshToken !== token) return res.send({ accessToken: '' });

  //token exist, create new refresh and access token
  const accessToken = createAccessToken({ id: user._id });
  const refreshToken = createRefreshToken({ id: user._id });
  await User.findByIdAndUpdate(user._id, { refreshToken: refreshToken });

  sendRefreshToken(res, refreshToken);
  //sendAccessToken(user, req, res, accessToken);
  return res.send({ accessToken, user });
});

export const RestrictTo = (...roles: any) => {
  return (req: any, res: any, next: any) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message:
          'You do not have permission to perform this action. \nContact your administrator',
      });
    }

    next();
  };
};
export const Logout = catchAsync(async (req: any, res: any) => {
  res.clearCookie('refreshToken', { path: 'refresh_token' });
  return res.send('Logged out');
});
