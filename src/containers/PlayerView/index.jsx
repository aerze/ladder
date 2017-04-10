import React, { Component } from 'react';

import PlayerCard from '../../components/PlayerCard';
import Error from '../../components/Error';

export default class PlayerView extends Component {

  componentWillMount() {

  }

  render() {
    const { players, error } = this.state;
    if (error) return <Error error={error} />;

    return (
      <div>
        {
          players.map(player => <PlayerCard key={player.name} {...player} />)
        }
      </div>
    );
  }
}
