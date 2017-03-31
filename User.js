

export default function User() {
  
  const users = [];

  this.findOrCreate = function({ googleId }, cb) {
    const existingUser = users.find(user => user.googleId === googleId);
    if (existingUser) return cb(null, existingUser);
    
    const user = { googleId, name: `test${users.length}` };
    users.push(user);
    return cb(null, user);

  }
}