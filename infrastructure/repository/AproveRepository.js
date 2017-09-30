const mysql = require('mysql');
const config = {
  host     : '50.62.209.157',
  port     : 3306,
  user     : 'adfinder',
  password : '1123581321',
  database : 'vendamais'
}

module.exports = class AproveRepository {
  findAd() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT ad.* FROM ad inner join aprove on ad.id = aprove.adId';
      const cn = mysql.createConnection(config);
      cn.connect((err) => {
        cn.query(sql, (err, results, fields) =>{
          if (err) 
            reject(err);
          else
            resolve(results);
          cn.end();
        })
      });
    });
  }

  findAll() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM aprove';
      const cn = mysql.createConnection(config);
      cn.connect((err) => {
        cn.query(sql, (err, results, fields) =>{
          if (err) 
            reject(err);
          else
            resolve(results);
          cn.end();
        })
      });
    });
  }

  findRating() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM rating WHERE `show` = 0';
      const cn = mysql.createConnection(config);
      cn.connect((err) => {
        cn.query(sql, (err, results, fields) =>{
          if (err) 
            reject(err);
          else
            resolve(results);
          cn.end();
        })
      });
    });
  }

  /**
   * 
   * @param {String} adId 
   */
  aproveAd(adId) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM aprove where adId = ?';
      const cn = mysql.createConnection(config);
      cn.connect((err) => {
        cn.query(sql, [adId], (err, results, fields) =>{
          if (err) 
            reject(err);
          else
            resolve(results);
          cn.end();
        })
      });
    });
  }

  aproveRating(adId) {
    return new Promise((resolve, reject) => {
      const sql = 'update rating set `show` = 1 where adId = ?';
      const cn = mysql.createConnection(config);
      cn.connect((err) => {
        cn.query(sql, [adId], (err, results, fields) =>{
          if (err) 
            reject(err);
          else
            resolve(results);
          cn.end();
        })
      });
    });
  }

  desaproveRating(adId) {
    return new Promise((resolve, reject) => {
      const sql = 'delete from rating where `show` = 0 and adId = ?';
      const cn = mysql.createConnection(config);
      cn.connect((err) => {
        cn.query(sql, [adId], (err, results, fields) =>{
          if (err) 
            reject(err);
          else
            resolve(results);
          cn.end();
        })
      });
    });
  }

  desaproveAd(id) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO aprove (adId) values (?)';
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