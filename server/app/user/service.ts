import { Response } from 'express';
import createAPIError from '../utils/error';
import { getTokens, isTokenValid, createJWT } from '../utils/jwt';
import User from './db';

const getAccessToken = async (req: any, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return createAPIError(400, `Please provide refresh token!`, res);
    }
    const payload = isTokenValid(refreshToken, res);
    let user = payload['user'];
    const accessTokenJWT = createJWT(
      { payload: { user, type: 'accessToken' } },
      '1d'
    );
    const accessToken = {
      accessTokenJWT,
      expiresIn: 1000 * 60 * 60 * 24 // 24 hrs!
    };
    res.status(200).json({ accessToken: accessTokenJWT, success: true });
  } catch (err) {
    const error = err.msg || err;
    createAPIError(400, error, res);
  }
};

const register = async (req: any, res: Response) => {
  const { email, password } = req.body;
  if (!email) {
    return createAPIError(400, `Please provide user email!`, res);
  }
  if (!password) {
    return createAPIError(400, `Please provide user password!`, res);
  }
  const checkEmail = await User.doesEmailExist(email);
  if (checkEmail.success && checkEmail.exists) {
    return createAPIError(
      400,
      `User by email: ${email} already exists, please try login.`,
      res
    );
  }
  const response = await User.createData({
    email,
    password
  });
  if (response.success) {
    const user = response.user;
    const { accessToken, refreshToken } = getTokens(user);
    const { accessTokenJWT } = accessToken;
    const { refreshTokenJWT } = refreshToken;
    res.set('accessTokenJWT', accessTokenJWT);
    res.set('refreshTokenJWT', refreshTokenJWT);
    return res.status(200).json({
      success: response.success,
      user
    });
  }
  createAPIError(400, response.error, res);
};

const login = async (req: any, res: Response) => {
  const { email, password } = req.body;
  if (!email) {
    return createAPIError(400, `Please provide user email!`, res);
  }
  if (!password) {
    return createAPIError(400, `Please provide user password!`, res);
  }
  const response = await User.getDataOnLogin({
    email,
    password
  });
  if (response.success) {
    const user = response.user;
    const { accessToken } = getTokens(user);
    const { accessTokenJWT } = accessToken;
    res.set('accessTokenJWT', accessTokenJWT);
    return res.status(200).json({
      success: response.success,
      user
    });
  }
  createAPIError(400, response.error, res);
};

const getDataByID = async (req: any, res: Response) => {
  if (!req.user) {
    return createAPIError(400, 'Error accessing data!', res);
  }
  const userId = req.user.id;
  const response = await User.getData(userId);
  if (response.success) {
    const user = response.user;
    return res.status(200).json({
      success: response.success,
      user
    });
  }
  createAPIError(400, response.error, res);
};

export = {
  register,
  login,
  getAccessToken,
  getDataByID
};
