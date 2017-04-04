import { Router } from 'express';
import Ranking from './Ranking';

/**
 * 
 * @param {Express} app 
 * @param {Object} db 
 */
export default function playerRoutes(app, db) {
  const router = new Router();
  const ranking = new Ranking(db);

  const handleResponse = (res, promise) => promise
    .then(data => res.json({ data }))
    .catch(error => {
      console.error(error);
      console.dir(error);
      return res.status(500).json({ error })
    });

  router.route('/api/ranking')
    .get((req, res) => handleResponse(res, ranking.update(req.body)))
  
  
  app.use(router);
};
