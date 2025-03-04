import express from 'express';

import dotenv from 'dotenv';

import { authRouter } from './routes/auth.route';

import messageRouter from './routes/message.route';

import cors from 'cors';

import { connectDB } from './lib/db';

import cookieParser from 'cookie-parser';

import {io, app, server} from './lib/socket'


dotenv.config();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json({limit: '10mb'}));

app.use(cookieParser());

app.use('/api/auth', authRouter);

app.use('/api/message', messageRouter);

const PORT = process.env.PORT;
server.listen(PORT || 3000, ()=> {
    console.log(`server started at port: ${PORT}`)
    connectDB(process.env.MONGOURL as string);
})
