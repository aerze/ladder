import RankedCompetitor from '../ranking/Competitor';
import RankedMatch from '../ranking/Match';
import { PromiseDatastore } from '../datastore';

export default class Match {
  constructor(db) {
    /** @type {PromiseDatastore} */
    this.players = db.players;

    /** @type {PromiseDatastore} */
    this.matches = db.matches;
  }

  create(body) {
    const { datePlayed, p1, p2, result } = body;

    return Promise.all([
      this.players.findOne({ name: p1 }),
      this.players.findOne({ name: p2 })
    ])
    .then(([ p1, p2 ]) => {
      const competitor1 = new RankedCompetitor(p1.name, p1.rating, p1.ratingsDev, p1.lastUpdated);
      const competitor2 = new RankedCompetitor(p2.name, p2.rating, p2.ratingsDev, p2.lastUpdated);

      const match = new RankedMatch(new Date(datePlayed), competitor1, competitor2, result);

      return this.matches.insert(match.toJSON());
    });
  }

  update(matchId, updateQuery) {
    return this.matches.update({ _id: matchId }, { $set: { ...updateQuery } });
  }

  find(requestQuery) {
    const query = {...requestQuery };
    if (requestQuery.id) {
      query._id = requestQuery.id;
      delete query.id;
    }

    console.log(query);
    return this.matches.find(query);
  }

  read(matchId) {
    return this.matches.findOne({ _id: matchId });
  }

  delete(matchId) {
    return this.matches.remove({ _id: matchId });
  }
}