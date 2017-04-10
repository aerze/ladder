import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Header from './Header';

import MainPage from '../containers/MainPage';
import Leaderboard from '../containers/Leaderboard';
import PlayerCreate from '../containers/PlayerCreate';
import PlayerView from '../containers/PlayerView';
import MatchCreate from '../containers/MatchCreate';
import MatchView from '../containers/MatchView';

const App = () => (
  <Router>
    <div>
      <Route path="/" component={Header} />
      <Route exact path="/" component={MainPage} />
      <Route exact path="/leaderboard" component={Leaderboard} />

      <Route exact path="/create-player" component={PlayerCreate} />
      <Route exact path="/players/:name?" component={PlayerView} />

      <Route exact path="/create-match" component={MatchCreate} />
      <Route exact path="/matches/:id?" component={MatchView} />
    </div>
  </Router>
);

export default App;
