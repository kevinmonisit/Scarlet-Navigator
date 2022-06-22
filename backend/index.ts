/* eslint-disable no-console */
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import userRouter from './api/userAPI';
import courseRouter from './api/courses';

dotenv.config();

// const mongoUri = !process.env['DEVELOPMENT_MODE']
//   ? process.env['MONGO_URI']
//   : process.env['MONGO_TEST_URI'];

const mongoUri = process.env['MONGO_URI'];

console.info(`DEVELOPMENT MODE is ${process.env['DEVELOPMENT_MODE']}`);
console.info(`Using mongo URI: ${mongoUri}`);

mongoose.connect(mongoUri ?? '').catch((err) => {
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
app.use(cors());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/courses', courseRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

export {};
