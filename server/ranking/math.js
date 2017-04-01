import Competitor from './Competitor';

const { pow, log, sqrt, PI, floor } = Math;

export const WIN = 'WIN';
export const DRAW = 'DRAW';
export const LOSS = 'LOSS';

export const SCORE_MAP = { WIN: 1, DRAW: 0.5, LOSS: 0 };

export const DEFAULT_RATING = 1500;
export const DEFAULT_RD = 350;
export const TYPICAL_PLAYER_RD = 50;


export const Q = log(10) / 400;

const DEFAULT_RD_SQ = pow(DEFAULT_RD, 2);
const TYPICAL_PLAYER_RD_SQ = pow(TYPICAL_PLAYER_RD, 2);
const DECAY_PERIODS = 730; // Assume the takes 2 years for info to decay
export const CONSTANT = sqrt((DEFAULT_RD_SQ - TYPICAL_PLAYER_RD_SQ) / DECAY_PERIODS);

export function checkNaN (label, x) {
  console.log(label, x);
  if (isNaN(x)) throw new Error(`${label} is not a number`);
};

/**
 * get g?
 * @param {Number} ratingsDev - ratings deviation
 */
export function g(ratingsDev) {
  console.log('\nmath:g');
  checkNaN('ratingsDev', ratingsDev);

  const pi2 = pow(PI, 2);
  const ratingsDev2 = pow(ratingsDev, 2);
  const q2 = pow(Q, 2);
  return 1 / sqrt(1 + ((3 * q2 * ratingsDev2) / pi2));
}

/**
 * 
 * @param {Number} rating 
 * @param {Competitor} comp
 */
export function es(rating, comp) {
  console.log('\nmath:es');
  checkNaN('rating', rating);
  checkNaN('comp.rating', comp.rating);
  checkNaN('comp.ratingsDev', comp.ratingsDev);


  const G = g(comp.ratingsDev);
  const rΔ = rating - comp.rating;
  const exponent = -1 * ((G * rΔ) / 400);
  return 1 / (1 + pow(10, exponent));
}

/**
 * Returns the sum of all values in an array
 * @param {Number[]} array
 */
export const Σ = array => array.reduce((p, n) => p+n, 0);

export const dayΔ = (startDate, endDate) => {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  return floor((endDate - startDate) / millisecondsPerDay);
}
