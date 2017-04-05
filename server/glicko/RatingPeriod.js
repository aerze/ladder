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
    console.log('RatingPeriod:: adding competitor to RatingPeriod');
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
    console.log('RatingPeriod:: adding match to RatingPeriod');
    this.matches.push(match);
  }

  applyResults() {
    console.log('RatingPeriod:: applying results');
    const { competitorLogs, matches } = this;
    matches.forEach(match => {
      match.playerNames.forEach(playerName => {
        console.log('RatingPeriod:: getting match data for opponent of:', playerName);
        const { competitor, result, date } = match.getMatchData(playerName);

        console.log(`RatingPeriod:: ${competitor.name} result`, result);
        const log = competitorLogs[playerName];
        log.opponents.push(competitor);
        log.results.push(result);
        log.dates.push(date);
        console.log('RatingPeriod:: pushed opponent result to log');
      });
    });
  }

  makeNewRankings() {
    console.log('RatingPeriod:: making new rankings');


    console.log('RatingPeriod:: applying results');
    this.applyResults();
    
    console.log('RatingPeriod:: applied results');

    for (const competitorName in this.competitorLogs) {
      console.log('RatingPeriod:: updating metrics for', competitorName);

      const log = this.competitorLogs[competitorName];
      const { competitor, opponents, results, dates } = log;
      console.log('RatingPeriod:: current rating for', competitorName, ':', competitor.rating);

      const { rating, ratingsDev, lastUpdated } = competitor.updatedMetrics(opponents, results, dates);
      console.log('RatingPeriod:: new rating for', competitorName, ':', rating);

      const newCompetitor = new Competitor(competitorName, rating, ratingsDev, new Date(lastUpdated).getTime());
      log.newMetrics = newCompetitor;
    }
  }
}