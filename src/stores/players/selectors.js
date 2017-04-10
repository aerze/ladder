

export function getTopPlayers({ players }, top) {
  return players
    .sort((p1, p2) => (p2.rating > p1.rating))
    .slice(0, top);
}

export function getAllPlayers({ players }) {
  return players;
}
