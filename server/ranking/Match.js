import { SCORE_MAP } from './math';
import Competitor from './Competitor';

export default class Match {
  /**
   * 
   * @param {Date} date
   * @param {Competitor} player
   * @param {Competitor} opponent
   * @param {String} playerResult 
   */
  constructor(date, player, opponent, playerResult) {
    this.date = date.getTime ? date.getTime() : date;
    this.player = player;
    this.opponent = opponent;
    this.applied = false;
    this.playerResult = playerResult;
    this.playerNames = [player.name, opponent.name];

    switch (playerResult) {
      case 'WIN':
        this.opponentResult = 'LOSS';
        break;
      case 'DRAW':
        this.opponentResult = 'DRAW';
        break;
      case 'LOSS':
        this.opponentResult = 'WIN';
        break;
    }
  }


  updateRankings() {
    const { player, opponent, playerResult, opponentResult } = this;
    if (this.applied) return;

    const playerStats = player.updatedMetrics([opponent], [playerResult]);
    const opponentStats = opponent.updatedMetrics([player], [opponentResult]);

    player.update(playerStats);
    opponent.update(opponentStats);
  }

  /**
   * @param {String} competitorName
   * @returns {Object}
   */
  getMatchData(competitorName) {
    const { player, opponent, playerResult, opponentResult, date } = this;
    const isPlayer = (player.name === competitorName);

    const competitor = (isPlayer) ? opponent: player;
    const result = (isPlayer) ? opponentResult: playerResult;

    return {
      competitor,
      result,
      date
    }
  }

  toJSON() {
    const {
      date,
      player,
      opponent,
      applied,
      playerResult,
      opponentResult,
      playerNames } = this;

    return {
      date,
      playerNames,
      playerResult,
      opponentResult,
      player: player.toJSON(),
      opponent: opponent.toJSON(),
    };
  }
}