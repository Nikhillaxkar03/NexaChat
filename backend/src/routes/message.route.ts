import { Router } from "express";
import { userAuth } from "../middlewares/auth.middleware";
import { getAllUser, getMessages } from "../controllers/message.controller";

const messageRouter = Router();

messageRouter.get('/users', userAuth, getAllUser); 
messageRouter.get('/:id', userAuth, getMessages); 
messageRouter.post('/send/:id', userAuth, getMessages); 








export default messageRouter;