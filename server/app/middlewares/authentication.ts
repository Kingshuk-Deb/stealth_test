import { isTokenValid } from '../utils/jwt';
import { Response, NextFunction } from 'express';
import createAPIError from '../utils/error';

const authenticateUser = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization || req.headers.authorization.length < 7) {
      return createAPIError(400, 'Please provide the accessToken!', res);
    }
    const accessToken = req.headers.authorization.split(' ')[1];
    const payload = isTokenValid(accessToken, res);
    if (!payload) {
      return createAPIError(
        401,
        'The token has expired! Please login again!',
        res
      );
    }
    req.user = payload['user'];
    return next();
  } catch (error) {
    let err = error.msg || error;
    console.error(err);
    createAPIError(401, 'Authentication failed!', res);
  }
};

export { authenticateUser };
