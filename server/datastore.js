import path from 'path';
import Datastore from 'nedb';

export class PromiseDatastore extends Datastore {
  createWrapper(resolve, reject) {
    return (err, result) => err ? reject(err) : resolve(result);
  }

  insert(newDoc) {
    return new Promise((resolve, reject) =>    
      super.insert(newDoc, this.createWrapper(resolve, reject))
    )
  }

  
  find(query, projection, returnCursor = false) {
    return new Promise((resolve, reject) => {
      const promiseWrapper = this.createWrapper(resolve, reject);
      if (returnCursor) return resolve(super.find(query, projection));
      if (projection) return super.find(query, projection, this.createWrapper(resolve, reject));
      return super.find(query, this.createWrapper(resolve, reject));
    });
  }

  findOne(query, projection) {
    return new Promise((resolve, reject) => {
      const promiseWrapper = this.createWrapper(resolve, reject);
      if (projection) return super.findOne(query, projection, promiseWrapper);
      return super.findOne(query, promiseWrapper);
    });
  }
  
  update(query, updateQuery, options = {}) {
    return new Promise((resolve, reject) => {
      return super.update(query, updateQuery, options, (err, numberOfUpdated = null, affectedDocuments = null, upsert = null) => {
        if (err) return reject(err);
        return resolve({ numberOfUpdated, affectedDocuments, upsert });
      });
    });
  }

  remove(query, options = {}) {
    return new Promise((resolve, reject) =>
      super.remove(query, options, this.createWrapper(resolve, reject)))
  }
};

export default function initDatastore() {
  const autocompactionSeconds = 60;
  const getOptions = (name) => ({
    filename: path.join(__dirname, '../datastore/', `${name}.nedb`),
    timestampDate: true,
    autoload: true
  });

  const db = {
    players: new PromiseDatastore(getOptions('players')),
    matches: new PromiseDatastore(getOptions('matches'))
  };

  db.players.persistence.setAutocompactionInterval(autocompactionSeconds * 1000);
  db.matches.persistence.setAutocompactionInterval(autocompactionSeconds * 1000);

  db.players.ensureIndex({ fieldName: 'name', unique: true });

  return db;
};