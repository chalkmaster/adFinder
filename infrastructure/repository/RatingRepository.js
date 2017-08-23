const db = require('sqlite');
const dbName = './adFinder.sqlite';

module.exports = class RatingRepository {
  findByAdId(id) {
    return new Promise((resolve, reject) => {
      db.open(dbName)
        .then(() => {
          db.all('SELECT * FROM rating WHERE show > 0 and adId = ?', [id]).then((data) => {
            resolve(data);
          }).catch((err) => {
            reject(err);
          });
        })
        .catch((err) => { throw err; });
    });
  }

  countByAdId(id) {
    return new Promise((resolve, reject) => {
      db.open(dbName)
        .then(() => {
          db.get('SELECT (select count(1) FROM rating WHERE liked > 0 and adId = ?) as liked, (select count(1) FROM rating WHERE liked <> 1 and adId = ?) as disliked', [id, id]).then((data) => {
            resolve(data);
          }).catch((err) => {
            reject(err);
          });
        })
        .catch((err) => { throw err; });
    });
  }

  insert(entityToSave) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO rating (adId, description, liked, show) values (?,?,?,0)';
      db.open(dbName).then(() => {
        db.run(sql, this.getParameters(entityToSave))
          .then(() => { console.log('saved'); resolve("OK"); }).catch((err) => { console.log(err); reject(err) });
      });
    });
  }

  bindModel(row) {
    return {
      adId: row.adId,
      description: row.description,
      liked: row.liked
    };
  }

  getParameters(entity) {
    let params = [];
    params.push(entity.adId);
    params.push(entity.description);
    params.push(entity.liked);
    return params;
  }
}
