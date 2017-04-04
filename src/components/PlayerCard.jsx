import React, { PureComponent } from 'react';

export default class PlayerCard extends PureComponent {
  render() {
    const { name, rating, ratingsDev, lastUpdated } = this.props;
    const updatedDate = new Date(lastUpdated);

    return (
      <div>
        <h3>{ name }</h3>
        <p>Skill: { rating }</p>
        <p>Sigma: { ratingsDev }</p>
        <p>Last Updated: { updatedDate.toLocaleDateString() }</p>
      </div>
    );
  }
}