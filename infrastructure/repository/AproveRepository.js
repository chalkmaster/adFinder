const db = require('sqlite');
const dbName = './adFinder.sqlite';

module.exports = class AproveRepository {
  findAd() {
    return new Promise((resolve, reject) => {
      db.open(dbName)
        .then(() => {
          db.get('SELECT ad.* FROM ad inner join aprove on ad.id = aprove.adId').then((data) => {
            resolve(data);
          }).catch((err) => {
            reject(err);
          });
        })
        .catch((err) => { throw err; });
    });
  }

  findAll() {
    return new Promise((resolve, reject) => {
      db.open(dbName)
        .then(() => {
          db.get('SELECT * FROM aprove').then((data) => {
            resolve(data);
          }).catch((err) => {
            reject(err);
          });
        })
        .catch((err) => { throw err; });
    });
  }

  findRating() {
    return new Promise((resolve, reject) => {
      db.open(dbName)
        .then(() => {
          db.get('SELECT * FROM rating WHERE show = 0', [id]).then((data) => {
            resolve(data);
          }).catch((err) => {
            reject(err);
          });
        })
        .catch((err) => { throw err; });
    });
  }

  /**
   * 
   * @param {String} adId 
   */
  aproveAd(adId) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM aprove where adId = ?';
      db.open(dbName).then(() => {
        db.run(sql, [adId])
          .then(() => { console.log('saved'); resolve("OK"); }).catch((err) => { console.log(err); reject(err) });
      });
    });
  }

  aproveRating(adId) {
    return new Promise((resolve, reject) => {
      const sql = 'update rating set show = 1 where adId = ?';
      db.open(dbName).then(() => {
        db.run(sql, [adId])
          .then(() => { console.log('saved'); resolve("OK"); }).catch((err) => { console.log(err); reject(err) });
      });
    });
  }

  desaproveAd(id) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO aprove (adId) values (?)';
      db.open(dbName).then(() => {
        db.run(sql, [id])
          .then(() => { console.log('saved'); resolve("OK"); }).catch((err) => { console.log(err); reject(err) });
      });
    });
  }

  bindModel(row) {
    return {
      cpf: row.cpf,
      email: row.email,
      password: row.password
    };
  }

  getParameters(entity) {
    let params = [];
    params.push(entity.cpf);
    params.push(entity.email);
    params.push(entity.password);
    return params;
  }
}
