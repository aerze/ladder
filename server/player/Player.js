import RankedCompetitor from '../glicko/Competitor';
import { PromiseDatastore } from '../datastore';

export default class Player {
  constructor(db) {
    /** @type {PromiseDatastore} */
    this.players = db.players;

    /** @type {PromiseDatastore} */
    this.matches = db.matches;
  }

  /**
   * Creates a new player in the datastore
   * @param {String} name
   * @returns {Promise<Object>}
   */
  create(name) {
    const competitor = new RankedCompetitor(name);
    return this.players.insert(competitor.toJSON());
  }

  update(name, updateQuery) {
    return this.players.update({ name }, { $set: { ...updateQuery } });
  }
  
  find(requestQuery) {
    const query = {...requestQuery };

    if (requestQuery.id) {
      query._id = requestQuery.id;
      delete query.id;
    }

    return this.players.find(query);
  }

  read(name) {
    return this.players.findOne({ name });
  }

  delete(name) {
    return this.players.remove({ name });
  }
}