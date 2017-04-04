import { Router } from 'express';
import Match from './Match';

/**
 * 
 * @param {Express} app 
 * @param {Object} db 
 */
export default function playerRoutes(app, db) {
  const router = new Router();
  const match = new Match(db);

  const handleResponse = (res, promise) => promise
    .then(data => res.json({ data }))
    .catch(error => res.status(500).json({ error }));

  router.route('/api/match/')
    .get((req, res) => handleResponse(res, match.find(req.query)))
    .post((req, res) => handleResponse(res, match.create(req.body)))
    // .patch((req, res) => handleResponse(res, match.update(req.params.name, req.body)))
    // .delete((req, res) => handleResponse(res, match.delete(req.params.name)))
  
  
  app.use(router);
};
