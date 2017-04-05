import { DEFAULT_RATING, DEFAULT_RD, CONSTANT, SCORE_MAP, Q, g, es, Σ, dayΔ, checkNaN } from './math';
const { pow, sqrt, max, min } = Math;

export default class Competitor {
  /**
   * Creates a Competitor
   * @param {String} name
   * @param {Number} rating
   * @param {Number} ratingsDev
   * @param {Date} lastUpdated
   */
  constructor(name, rating = DEFAULT_RATING, ratingsDev = DEFAULT_RD, lastUpdated = new Date()) {
    checkNaN('this.rating', rating);
    checkNaN('this.ratingsDev', ratingsDev);

    this.name = name;
    this.rating = rating;
    this.ratingsDev = ratingsDev;
    this.lastUpdated = lastUpdated.getTime ? lastUpdated.getTime() : lastUpdated;
  }


  /**
   * Gets d²
   * @param {Competitor[]} competitors
   * @returns {Number}
   */
  getDsq(competitors = []) {
    const { rating } = this;

    /**
     * @param {Competitor} comp
     * @returns {Number}
     **/
    const summand = (comp) => {
      const G = g(comp.ratingsDev);
      const G_SQ = pow(G, 2);
      const ES = es(rating, comp);
      return G_SQ * ES * (1-ES);
    };

    const summands = competitors.map(comp => summand(comp));
    const Q_SQ = pow(Q, 2);

    return pow(Q_SQ * Σ(summands), -1);
  }


  /**
   * 
   * @param {Competitor[]} competitors
   * @param {String[]} results
   * @param {Number} d2 
   */
  updatedRating(competitors, results, d2) {
    const { rating, ratingsDev } = this;
    const ratingsDev2 = pow(ratingsDev, 2);
    console.log('Competitor::updatedMetrics::updatedRating():: ratings deviation squared', ratingsDev2);
    checkNaN('updatedRating.rating', rating);

    /**
     * 
     * @param {Competitor} comp 
     * @param {String} result
     */
    const summand = (comp, result) => {
      checkNaN('updatedRating.summand.comp.rating', comp.rating);
      checkNaN('updatedRating.summand.comp.ratingsDev', comp.ratingsDev);

      const G = g(comp.ratingsDev);
      const ES = es(rating, comp);

      console.log('Competitor::updatedMetrics::updatedRating::summand():: result', result);
      const score = SCORE_MAP[result];
      console.log('Competitor::updatedMetrics::updatedRating::summand():: score', score);

      return G * (score - ES);
    };

    const multiplier = (Q / (1 / ratingsDev2 + (1 / d2)));
    console.log('Competitor::updatedMetrics::updatedRating():: multiplier', multiplier);

    const summands = competitors.map((comp, i) => summand(comp, results[i]));
    console.log('Competitor::updatedMetrics::updatedRating():: summands', summands);
    checkNaN('updatedRating.multiplier', multiplier);

    return rating + (multiplier * Σ(summands));
  }


  /**
   * 
   * @param {Number} d2 
   */
  updatedRatingsDev(d2) {
    const { ratingsDev } = this;
    const ratingsDev2 = pow(ratingsDev, 2);

    const newRatingsDev = sqrt( (1 / ratingsDev2) + (1 / pow(d2, -1)) );
    const dateNow = new Date().getTime();
    const lastUpdatedDate = this.lastUpdated;
    const ratingPeriods = dayΔ(lastUpdatedDate, dateNow);
    const adjustedRatingsDev = sqrt(pow(newRatingsDev, 2) + pow(CONSTANT, 2) + ratingPeriods);

    return max(min(adjustedRatingsDev, 350), 30);
  }


  /**
   * 
   * @param {Competitor[]} others
   * @param {String[]} results
   * @param {Number[]} dates 
   * @returns {Object}
   */
  updatedMetrics(others, results, dates) {
    console.log('Competitor::updatedMetrics():: updating metrics for', this.name);
    this.lastUpdated = dates
      ? max(this.lastUpdated, max(...dates))
      : this.lastUpdated;
    
    if (others) {
      console.log('Competitor::updatedMetrics():: opponents found');
      const d2 = this.getDsq(others);
      console.log('Competitor::updatedMetrics():: d squared', d2);

      console.log('Competitor::updatedMetrics():: calculating ranking for', others.map(p => p.name), 'with', results);
      const rating = this.updatedRating(others, results, d2)
      console.log('Competitor::updatedMetrics():: new rating', rating);

      const ratingsDev = this.updatedRatingsDev(d2);
      console.log('Competitor::updatedMetrics():: new ratingsDev', ratingsDev);

      const lastUpdated = this.lastUpdated;
      checkNaN('updatedMetrics.rating', rating);
      checkNaN('updatedMetrics.ratingsDev', ratingsDev);
      
      return { rating, ratingsDev, lastUpdated };
    } else {
      const { rating, ratingsDev, lastUpdated } = this;
      return { rating, ratingsDev, lastUpdated };
    }
  }


  update({ rating, ratingsDev }) {
    checkNaN('rating', rating);
    checkNaN('ratingsDev', ratingsDev);
    
    this.rating = rating;
    this.ratingsDev = ratingsDev;
  }


  print() {
    const { name, rating, ratingsDev, lastUpdated } = this;
    return `${name}\n  rating:${rating}\n  deviation:${ratingsDev}\n  last updated:${lastUpdated.toLocaleTimeString()};${lastUpdated.toLocaleDateString()}`;
  }

  toJSON() {
    const { name, rating, ratingsDev, lastUpdated } = this;
    return { name, rating, ratingsDev, lastUpdated };
  }
}