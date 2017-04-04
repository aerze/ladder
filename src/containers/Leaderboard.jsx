import React, { Component } from 'react';
import Players from '../api/Players';

import PlayerCard from '../components/PlayerCard';
import Error from '../components/Error';

export default class Leaderboard extends Component {
  constructor() {
    super();

    this.state = {
      players: [],
      error: null
    };
  }

  sortRank(players) {
    return [...players].sort((p1, p2) => {
      return p1.rating - p2.rating;
    });
  }

  componentWillMount() {
    Players
      .getPlayers()
      .then(players => this.setState({ players: this.sortRank(players) }))
      .catch(error => this.setState({ error }));
  }

  render() {
    const { players, error } = this.state;
    
    if (error) return <Error error={error} />;

    return (
      <div>    
        { players.map(player => <PlayerCard key={player.name} {...player} />) }
      </div>
    );
  }
}