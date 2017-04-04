import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Nav from './components/Nav';

import Leaderboard from './containers/Leaderboard';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav/>

          <Route path="/" component={Leaderboard}/>
          <Route path="/players" component={Leaderboard}/>
          <Route path="/players/create" component={Leaderboard}/>
          <Route path="/matches" component={Leaderboard}/>
          <Route path="/matches/create" component={Leaderboard}/>
        </div>
      </Router>
    );
  }
}

export default App;
