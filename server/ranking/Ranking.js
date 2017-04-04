import RankedCompetitor from '../glicko/Competitor';
import RankedMatch from '../glicko/Match';
import RatingPeriod from '../glicko/RatingPeriod';
import { PromiseDatastore } from '../datastore';

export default class Ranking {
  constructor(db) {
    /** @type {PromiseDatastore} */
    this.players = db.players;

    /** @type {PromiseDatastore} */
    this.matches = db.matches;
  }

  update() {
    return this.matches.find({ applied: false })
      .then(matches => {
        const allPlayerNames = matches.reduce((names, match) => names.concat(match.playerNames), []);
        const uniquePlayerNames = [...new Set(allPlayerNames)];

        return Promise.all(uniquePlayerNames.map(name => this.players.findOne({ name })))
          .then(playerData => {
            return playerData.reduce((competitors, { name, rating, ratingsDev, lastUpdated }) => {
              competitors[name] = new RankedCompetitor(name, rating, ratingsDev, lastUpdated);
              return competitors;
            }, {})
          })
          .then(competitors => {
            const ratingPeriod = new RatingPeriod();

            uniquePlayerNames.forEach(name => ratingPeriod.addCompetitor(competitors[name]));
            matches.forEach(match => {
              const player = competitors[match.player.name];
              const opponent = competitors[match.opponent.name];
              const rankedMatch = new RankedMatch(match.date, player, opponent, match.playerResult);
              ratingPeriod.addMatch(rankedMatch);
            });

            ratingPeriod.makeNewRankings();

            const updateMatchPromises = matches.map(match =>
              this.matches.update({ _id: match._id }, { $set: { applied: true }})
            );

            const updateCompetitorsPromises = uniquePlayerNames.map(name => {
              const updatedData = ratingPeriod.competitorLogs[name].newMetrics.toJSON();
              return this.players.update({ name: updatedData.name }, { $set: { ...updatedData } });
            });


            return Promise.all(updateMatchPromises.concat(updateCompetitorsPromises));
          });
      });
  }
}