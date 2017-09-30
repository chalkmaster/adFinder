const mysql = require('mysql');
const config = {
  host     : '50.62.209.157',
  port     : 3306,
  user     : 'adfinder',
  password : '1123581321',
  database : 'vendamais'
}

module.exports = class UserRepository {
  findByEmail(email) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT `user`.*, ad.name, ad.region, ad.phone, ad.site from `user` left join ad on ad.id = `user`.cpf WHERE `user`.email = ?';
      const cn = mysql.createConnection(config);
      cn.connect((err) => {
        cn.query(sql, [email], (err, results, fields) =>{
          if (err) 
            reject(err);
          else
            resolve(results && results.length ? results[0] : null);
          cn.end();
        })
      });
    });
  }

  findByCpf(cpf) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM `user` WHERE cpf = ?';
      const cn = mysql.createConnection(config);
      cn.connect((err) => {
        cn.query(sql, [cpf], (err, results, fields) =>{
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
      const sql = 'INSERT INTO `user` (cpf, email, password) values (?,?,?)';
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
