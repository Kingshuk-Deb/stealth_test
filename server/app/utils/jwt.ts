import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import createAPIError from './error';
import { Response } from 'express';

const createJWT = ({ payload }, expiresIn) => {
  try {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn });
    return token;
  } catch (error) {
    let err = error.message || error;
    console.error(err);
    createAPIError(400, `Error while creating token!`);
  }
};

const getTokens = (user) => {
  let accessTokenExpiry = '1d';

  let refreshTokenExpiry = '7d';

  const accessTokenJWT = createJWT(
    { payload: { user, type: 'accessToken' } },
    accessTokenExpiry
  );

  const refreshTokenJWT = createJWT(
    { payload: { user, type: 'refreshToken' } },
    refreshTokenExpiry
  );

  const accessToken = {
    accessTokenJWT,
    expiresIn: 1000 * 60 * 60 * 24 // 24 hrs!
  };

  const refreshToken = {
    refreshTokenJWT,
    expiresIn: 1000 * 60 * 60 * 24 * 7 // 7 days!
  };

  return { accessToken, refreshToken };
};

const isTokenValid = (token, res: Response) => {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return payload;
  } catch (err) {
    const error = err.message || err;
    console.error(error);
    return createAPIError(
      401,
      'The token has expired! Please login again!',
      res
    );
  }
};

export { createJWT, isTokenValid, getTokens };
