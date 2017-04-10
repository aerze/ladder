import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { playerActions } from '../../stores/players';
import { playerSelectors } from '../../stores';

import PlayerCard from '../../components/PlayerCard';
import Error from '../../components/Error';

class Leaderboard extends Component {

  static sortRank(players) {
    return [...players].sort((p1, p2) => (p1.rating - p2.rating));
  }

  componentWillMount() {
    this.props.getPlayers();
  }

  render() {
    const { players, error } = this.props;

    if (error) return <Error error={error} />;

    return (
      <div>
        { players.map(player => <PlayerCard key={player.name} {...player} />) }
      </div>
    );
  }
}

Leaderboard.propTypes = {
  players: PropTypes.array, // redux store
  error: PropTypes.object,
  getPlayers: PropTypes.func.isRequired // dispatch
};

Leaderboard.defaultProps = {
  players: [],
  error: null
};

const mapStateToProps = store => ({
  players: playerSelectors.getTopPlayers(store, 1)
});

const mapDispatchToProps = {
  ...playerActions
};

export { Leaderboard as baseComponent };
export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
