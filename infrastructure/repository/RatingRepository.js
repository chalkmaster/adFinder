const db = require('sqlite');
const dbName = './adFinder.sqlite';

module.exports = class RatingRepository {
  findByAdId(id) {
    return new Promise((resolve, reject) => {
      db.open(dbName)
        .then(() => {
          db.get('SELECT * FROM rating WHERE adId = ?', [id]).then((data) => {
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
      const sql = 'INSERT INTO rating (adId, description, liked) values (?,?,?)';
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
