import { Router } from 'express';
import Player from './Player';
const router = new Router();

const users = [1, 2, 3];

router.route('/')
  .get((req, res) => res.json(users))

// router.route('/create')
//   .post((req, res) => {
//     const { name } = req.body;
//     Player.create(name);

//   })
export default router;