import { Schema } from 'mongoose';
import express, { Request, Response } from 'express';
import CourseController from '../controllers/courseController';

const router = express.Router();

interface ReqQuery {
  search: string;
}

router.get(
  '/',
  async (req: Request<{}, {}, {}, ReqQuery, {}>, res: Response) => {
    const coursesQuery = await CourseController.getCourses(req.query['search']);
    console.log(req.query['search']);
    res.status(200).send({ coursesQuery });
  }
);

export default router;
