require('../models/CourseModel');
import Schema from 'mongoose';
import express, { Request, Response } from 'express';
import UserController from '../controllers/userController';

const router = express.Router();

interface requestById {
  id: Schema.Types.ObjectId;
}

router.get('/', (req: Request, res: Response) => {
  res.send('accessing users');
});

router.get('/:id', async (req: Request<requestById>, res: Response) => {
  const userQuery = await UserController.getUser(req.params['id']);

  if (userQuery) {
    res.status(200).send({ userQuery });
  } else {
    res.status(404).send('Invalid user query');
  }
});

router.get(
  '/:id/schedule/',
  async (req: Request<requestById>, res: Response) => {
    const coursesQuery = await UserController.getScheduleOfUser(
      req.params['id']
    );

    if (coursesQuery) {
      res.status(200).send({ courses: coursesQuery['courses'] });
    } else {
      res.status(404).send('Invalid user id');
    }
  }
);

router.patch('/:id/schedule', async (req: Request, res: Response) => {});

module.exports = router;
