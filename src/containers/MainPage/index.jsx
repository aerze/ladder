import React, { Component } from 'react';
// import Players from '../../api/Players';

export default class MainPage extends Component {
  constructor() {
    super();

    this.state = {
      topPlayers: [],
      recentMatches: []
    };
  }

  componentWillMount() {
  }

  render() {
    return (
      <div>
        <h1>Main Page</h1>
      </div>
    );
  }
}
