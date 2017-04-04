import { Router } from 'express';
import Player from './Player';

/**
 * 
 * @param {Express} app 
 * @param {Object} db 
 */
export default function playerRoutes(app, db) {
  const router = new Router();
  const player = new Player(db);

  const handleResponse = (res, promise) => promise
    .then(data => res.json({ data }))
    .catch(error => res.status(500).json({ error }));
  
  router.route('/api/players/')
    .get((req, res) => handleResponse(res, player.find(req.query)))

  router.route('/api/player/:name')
    .get((req, res) => handleResponse(res, player.read(req.params.name)))
    .post((req, res) => handleResponse(res, player.create(req.params.name)))
    .patch((req, res) => handleResponse(res, player.update(req.params.name, req.body)))
    .delete((req, res) => handleResponse(res, player.delete(req.params.name)))
  
  
  app.use(router);
};
