
import RatingPeriod from './RatingPeriod';
import Competitor from './Competitor';
import Match from './Match';
import { WIN, DRAW, LOSS } from './math';

export function logDate (date, label = 'logDate') {
  const localeDate = date.toLocaleDateString();
  const localeTime = date.toLocaleTimeString();
  console.log(`${label}: ${localeDate} ${localeTime}`);
}

export default function main () {
  const datePlayed = new Date();
  logDate(datePlayed, 'datePlayed');

  const alice = new Competitor('Alice', 1400, 30, datePlayed);
  const bob = new Competitor('Bob', 1500, 100, datePlayed);
  const charlie = new Competitor('Charlie', 1700, 300, datePlayed);
  const dana = new Competitor('Dana', 1500, 200, datePlayed);
  const evan = new Competitor('Evan');
  const competitors = [alice, bob, charlie, dana, evan];

  // console.log(competitors);
  // console.dir(alice);


  const match1 = new Match(datePlayed, alice, dana, LOSS);
  const match2 = new Match(datePlayed, bob, dana, WIN);
  const match3 = new Match(datePlayed, charlie, dana, WIN);
  const match4 = new Match(datePlayed, evan, dana, WIN);
  const matches = [match1, match2, match3, match4];

  // console.log(matches);
  // console.dir(match1);

  const ratingPeriod = new RatingPeriod();
  
  competitors.forEach(comp => ratingPeriod.addCompetitor(comp));
  matches.forEach(match => ratingPeriod.addMatch(match));
  ratingPeriod.makeNewRankings();
  for (const name in ratingPeriod.competitorLogs) {
    console.log(ratingPeriod.competitorLogs[name].newMetrics);
  }
  

}