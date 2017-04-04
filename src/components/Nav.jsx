import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Nav extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/">Leaderboard</Link></li>
          <li><Link to="/players">Players</Link></li>
          <li><Link to="/players/create">New Player</Link></li>
          <li><Link to="/matches">Matches</Link></li>
          <li><Link to="/matches/create">Record Match</Link></li>
        </ul>
        <hr/>
      </div>
    );
  }
}