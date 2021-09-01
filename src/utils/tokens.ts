import { sign } from 'jsonwebtoken';
const createAccessToken = (id: any) => {
  return sign(
    id,
    process.env.ACCESS_TOKEN_SECRET || 'in the shadow of his wings',
    {
      expiresIn: '1d',
    }
  );
};

const createRefreshToken = (id: any) => {
  return sign(
    id,
    process.env.REFRESH_TOKEN_SECRET || 'in the shadow of his wings',
    {
      expiresIn: '1d',
    }
  );
};

const sendAccessToken = (
  user: any,
  req: any,
  res: any,
  accessToken: string
) => {
  res.json({
    accessToken,
    user,
  });
};

const sendRefreshToken = (res: any, refreshToken: string) => {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    path: 'refresh_token',
  });
};
export {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
};
