import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Players from '../api/Players';

import Error from '../components/Error';

export default class RankPage extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      error: null
    };
  }

  componentWillMount() {
    Players
      .getPlayers()
      .then(users => this.setState({ users }))
      .catch(error => this.setState({ error }));
  }

  render() {
    const { users, error } = this.state;
    
    if (error) return <Error error={error} />;

    return (
      <div>    
        { users.map(user => (<li> User: { user } </li> )) }
      </div>
    );
  }
}