const db = require('sqlite');
const dbName = './adFinder.sqlite';

module.exports = class RatingRepository {
  findByEmail(email) {
    return new Promise((resolve, reject) => {
      db.open(dbName)
        .then(() => {
          db.get('SELECT * FROM user WHERE email = ?', [email]).then((data) => {
            resolve(data);
          }).catch((err) => {
            reject(err);
          });
        })
        .catch((err) => { throw err; });
    });
  }

  findByCpf(cpf) {
    return new Promise((resolve, reject) => {
      db.open(dbName)
        .then(() => {
          db.get('SELECT * FROM user WHERE cpf = ?', [cpf]).then((data) => {
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
      const sql = 'INSERT INTO user (cpf, email, password) values (?,?,?)';
      db.open(dbName).then(() => {
        db.run(sql, this.getParameters(entityToSave))
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
