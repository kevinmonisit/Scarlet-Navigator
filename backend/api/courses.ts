import { Schema } from 'mongoose';
import express, { Request, Response } from 'express';
import CourseController from '../controllers/courseController';

const router = express.Router();

interface ReqQuery {
  search: string;
  amount: number;
  searchType: number;
}

router.get(
  '/',
  async (req: Request<{}, {}, {}, ReqQuery, {}>, res: Response) => {
    const { amount, search, searchType } = req.query;
    if (Number.isNaN(amount) || amount <= 0 || amount > 100) {
      res.status(400).send({
        error: 'amount parameter should be a number, x, where 0 <= x <= 100',
      });
      return;
    }

    if (searchType > 2 || searchType < 0) {
      res.status(400).send({
        error: `SearchType is invalid. Value is ${searchType}`,
      });
      return;
    }

    const coursesQuery = await CourseController.getCourses(
      search,
      amount,
      searchType
    );
    res.status(200).send({ coursesQuery });
  }
);

export default router;
