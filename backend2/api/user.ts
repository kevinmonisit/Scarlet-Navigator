import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/schedule', (req: Request, res: Response) => {
  res.send({ test: 'hello' });
});

module.exports = router;
