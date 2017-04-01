import { Router } from 'express';

const router = new Router();

const users = [1, 2, 3];

router.route('/')
  .get((req, res) => res.json(users))

export default router;