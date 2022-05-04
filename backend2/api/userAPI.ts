import { Schema } from 'mongoose';
import express, { Request, Response } from 'express';
import UserController from '../controllers/userController';

require('../models/CourseModel');

const router = express.Router();

interface requestById {
  id: Schema.Types.ObjectId;
}

interface sendingPlanData {
  plan: Array<Array<Schema.Types.ObjectId>>;
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
  '/:id/courses/',
  async (req: Request<requestById>, res: Response) => {
    const coursesQuery = await UserController.getCoursesOfUser(
      req.params['id']
    );

    if (coursesQuery) {
      res.status(200).send({ a: coursesQuery['courses'] });
    } else {
      res.status(404).send('Invalid user id');
    }
  }
);

router.get('/:id/plan', async (req: Request<requestById>, res: Response) => {
  const planQuery = await UserController.getPlanOfUser(req.params['id']);

  if (planQuery) {
    res.status(200).send({ plan: planQuery, type: typeof planQuery });
  } else {
    res.send('Invalid id!');
  }
});

router.patch(
  '/:id/plan',
  async (req: Request<requestById, {}, sendingPlanData>, res: Response) => {
    const updatePlanQuery = await UserController.updatePlanOfUser(
      req.params['id'],
      req.body['plan']
    );

    if (updatePlanQuery) {
      res.status(200).send({});
    } else {
      res.status(400);
    }
  }
);

export default router;
