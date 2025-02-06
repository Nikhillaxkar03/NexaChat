import express from 'express';

import {signUp, login, signOut, updateProfile, checkAuth} from '../controllers/auth.controller'
import { userAuth } from '../middlewares/auth.middleware';

const authRouter = express.Router();

authRouter.post('/signup', signUp);
authRouter.post('/login', login);
authRouter.post('/signout', signOut);
authRouter.put('/update-profile', userAuth, updateProfile);
authRouter.get('/check-auth', userAuth, checkAuth);

export {authRouter};