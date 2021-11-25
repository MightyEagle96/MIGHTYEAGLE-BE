import { verify } from 'jsonwebtoken';

const isAuth = (req: any, res: any) => {
  const authorization = req.headers['authorization'];
  if (!authorization)
    return res.status(401).json({ message: 'You are not logged in' });

  const token = authorization.split(' ')[1];
  const { id }: any = verify(token, process.env.ACCESS_TOKEN_SECRET || 'hello');

  return id;
};

export default isAuth;
