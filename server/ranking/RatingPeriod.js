import Competitor from './Competitor';
import Match from './Match';

/**
 * @typedef {Object} CompetitorLog
 * @property {Competitor} competitor
 * @property {Competitor[]} opponents
 * @property {String[]} results
 * @property {Number[]} dates
 */

export default class RatingPeriod {
  constructor() {
    /** @type {CompetitorLog[]} */
    this.competitorLogs = {};

    /** @type {Match[]} */
    this.matches = [];
  }


  /**
   * @param {Competitor} competitor 
   */
  addCompetitor(competitor) {
    const existingCompetitorLog = this.competitorLogs[competitor.name];
    if (!existingCompetitorLog) {
      this.competitorLogs[competitor.name] = {
        competitor,
        opponents: [],
        results: [],
        dates: [],
        /** @type {Competitor} */
        newMetrics: null
      };
    }
  }

  /**
   * @param {Match} match 
   */
  addMatch(match) {
    this.matches.push(match);
  }

  applyResults() {
    const { competitorLogs, matches } = this;
    matches.forEach(match => {
      match.playerNames.forEach(playerName => {
        const { competitor, result, date } = match.getMatchData(playerName);
        const log = competitorLogs[playerName];
        log.opponents.push(competitor);
        log.results.push(result);
        log.dates.push(date);
      });
    });
  }

  makeNewRankings() {
    this.applyResults();
    console.log('RatingPeriod: Applied Results');

    for (const competitorName in this.competitorLogs) {
      const log = this.competitorLogs[competitorName];
      const { competitor, opponents, results, dates } = log;
      console.log('RatingPeriod:makeNewRankings:: updating metics for', competitorName);

      const { rating, ratingsDev, lastUpdated } = competitor.updatedMetrics(opponents, results, dates);
      const newCompetitor = new Competitor(competitorName, rating, ratingsDev, new Date(lastUpdated));
      log.newMetrics = newCompetitor;
    }
  }
}