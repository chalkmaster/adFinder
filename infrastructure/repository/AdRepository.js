const db = require('sqlite');
const dbName = './adFinder.sqlite';

module.exports = class AdRepository {

  constructor() {
    Promise.resolve().then(() =>
      db.open(dbName, { cached: true })
        .then(() => {
          db.migrate();
        })
        .catch((err) => { throw err })
    ).catch((err) => { throw err });
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM ad WHERE id = ?', [id]).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  count() {
    return new Promise((resolve, reject) => {
      db.get('SELECT count(1) as qtd FROM ad').then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  search(expression) {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM ad WHERE ad MATCH ?', expression).then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  findAll(expression) {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM ad').then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  update(entityToSave) {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE ad SET id = ?,name = ?,description = ?,region = ?,category = ?,phone = ?,email = ?,site = ? WHERE id = ?';
      db.run(sql, this.getParameters(entityToSave, entityToSave.id))
        .then(() => { resolve(); }).catch((err) => { reject(err) });
    });
  }

  insert(entityToSave) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO ad (id,name,description,region,category,phone,email,site) values (?,?,?,?,?,?,?,?)';
      db.run(sql, this.getParameters(entityToSave))
        .then(() => { console.log('saved'); resolve("OK"); }).catch((err) => { console.log(err); reject(err) });
    });
  }

  delete(entityToDelete) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM ad WHERE id = ?';
      db.run(sql, entityToDelete.id)
        .then(() => { resolve(); }).catch((err) => { reject(err) });
    });
  }

  bindModel(row) {
    return {
      name: row.name,
      id: row.id,
      description: row.description,
      region: row.region,
      category: row.category,
      contacts: {
        phone: row.phone,
        email: row.email,
        site: row.site
      }
    };
  }

  getParameters(entity, id) {
    let params = [];
    params.push(entity.id);
    params.push(entity.name);
    params.push(entity.description);
    params.push(entity.region);
    params.push(entity.category);
    params.push(entity.phone);
    params.push(entity.email);
    params.push(entity.site);

    if (id)
      params.push(id);

    return params;
  }
}
