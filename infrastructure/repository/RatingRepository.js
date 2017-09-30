const mysql = require('mysql');
const config = {
  host     : '50.62.209.157',
  port     : 3306,
  user     : 'adfinder',
  password : '1123581321',
  database : 'vendamais'
}

module.exports = class RatingRepository {
  findByAdId(id) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM rating WHERE `show` > 0 and adId = ?';
      const cn = mysql.createConnection(config);
      cn.connect((err) => {
        cn.query(sql, [id], (err, results, fields) =>{
          if (err) 
            reject(err);
          else
            resolve(results);
          cn.end();
        })
      });
    });
  }

  countByAdId(id) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT (select count(1) FROM rating WHERE liked > 0 and adId = ?) as liked, (select count(1) FROM rating WHERE liked <> 1 and adId = ?) as disliked';
      const cn = mysql.createConnection(config);
      cn.connect((err) => {
        cn.query(sql, [id, id], (err, results, fields) =>{
          if (err) 
            reject(err);
          else
            resolve(results && results.length ? results[0] : null);
          cn.end();
        })
      });
    });
  }

  insert(entityToSave) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO rating (adId, description, liked, `show`) values (?,?,?,0)';
      const cn = mysql.createConnection(config);
      cn.connect((err) => {
        cn.query(sql, this.getParameters(entityToSave), (err, results, fields) =>{
          if (err) 
            reject(err);
          else
            resolve(results);
          cn.end();
        })
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
