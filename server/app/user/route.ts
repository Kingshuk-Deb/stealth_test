import { Router } from 'express';
import User from './service';
import { authenticateUser } from '../middlewares/authentication';

export const router = Router();

router.post('/register', User.register);
router.post('/login', User.login);
router.post('/access-token', User.getAccessToken);

router.get('/', authenticateUser, User.getDataByID);