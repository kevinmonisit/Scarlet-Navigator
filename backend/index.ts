/* eslint-disable no-console */
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import userRouter from './api/userAPI';
import courseRouter from './api/courses';

dotenv.config();
const localUri = 'mongodb://localhost:27017/s-n-t';

mongoose.connect(process.env['MONGO_URI'] ?? localUri).catch((err) => {
  console.warn(err);
});

mongoose.connection
  .once('open', () => {
    console.log('Connected to MongoDB');
  })
  .on('error', (error) => {
    console.warn(error);
  });

const app: Express = express();
const port = process.env['PORT'];

app.use(morgan('tiny'));
app.set('json spaces', 2);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/user', userRouter);
app.use('/api/v1/courses', courseRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

export {};
