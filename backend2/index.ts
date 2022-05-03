/* eslint-disable no-console */
import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import userRouter from './api/userAPI';

dotenv.config();

mongoose
  .connect('mongodb://localhost:27017/scarlet-navigator-test')
  .catch((err) => {
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

app.use(cors());
app.use(morgan('tiny'));
app.set('json spaces', 2);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/user', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

export {};
