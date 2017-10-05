const mysql = require('mysql');
const config = {
  host     : '50.62.209.157',
  port     : 3306,
  user     : 'adfinder',
  password : '1123581321',
  database : 'vendamais'
}

module.exports = class AdRepository {

  constructor() {  }

  findById(id) {
    return new Promise((resolve, reject) => {
      const cn = mysql.createConnection(config);
      cn.connect((err) => {
        cn.query('SELECT * FROM ad WHERE id = ?', [id], (err, results, fields) =>{
          if (err) 
            reject(err);
          else
            resolve(results && results.length ? results[0] : null);
          cn.end();
        })
      });
    });
  }

  getCategories() {
    return new Promise((resolve, reject) => {
      const cn = mysql.createConnection(config);
      cn.connect((err) => {
        cn.query('SELECT distinct category FROM cat', (err, results, fields) =>{
          if (err) 
            reject(err);
          else
            resolve(results);
          cn.end();
        })
      });
    });
  }

  count() {
    return new Promise((resolve, reject) => {
      const cn = mysql.createConnection(config);
      cn.connect((err) => {
        cn.query('SELECT count(1) as qtd FROM ad', (err, results, fields) =>{
          if (err) 
            reject(err);
          else
            resolve(results && results.length ? results[0] : null);
          cn.end();
        })
      });
    });
  }

  search(expression) {
    return new Promise((resolve, reject) => {
      const cn = mysql.createConnection(config);
      cn.connect((err) => {
        cn.query('SELECT * FROM ad WHERE ad MATCH (name, description, region, category, phone, email, site) AGAINST (?) and not exists (select * from aprove where adId = ad.id)', [expression], (err, results, fields) =>{
          if (err) 
            reject(err);
          else
            resolve(results);
          cn.end();
        })
      });
    });
  }

  findAll(expression) {
    return new Promise((resolve, reject) => {      
      const cn = mysql.createConnection(config);
      cn.connect((err) => {
        cn.query('SELECT * FROM ad Where not exists (select * from aprove where adId = ad.id)', (err, results, fields) =>{
          if (err) 
            reject(err);
          else
            resolve(results);
          cn.end();
        })
      });
    });
  }

  update(entityToSave) {
    return new Promise((resolve, reject) => {
      const sql = 'Insert INTO ad (id,name,description,region,category,phone,email,site) values (?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE name = ?,description = ?,region = ?,category = ?,phone = ?,email = ?,site = ?';
      const updatePar = this.getParameters(entityToSave).slice(1, 8);
      const cn = mysql.createConnection(config);
      cn.connect((err) => {
        cn.query(sql, this.getParameters(entityToSave).concat(updatePar), (err, results, fields) =>{
          if (err) 
            reject(err);
          else
            resolve(results);
          cn.end();
        })
      });
    });
  }

  insert(entityToSave) {
    return new Promise((resolve, reject) => {
      const sql = 'Insert INTO ad (id,name,description,region,category,phone,email,site) values (?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE name = ?,description = ?,region = ?,category = ?,phone = ?,email = ?,site = ?';
      const cn = mysql.createConnection(config);
      cn.connect((err) => {
        const updatePar = this.getParameters(entityToSave).slice(1, 8);
        cn.query(sql, this.getParameters(entityToSave).concat(updatePar), (err, results, fields) =>{
          if (err) 
            reject(err);
          else
            resolve(results);
          cn.end();
        })
      });
    });
  }

  updateProfile(entityToSave) {
    return new Promise((resolve, reject) => {
      const sql = 'update ad set id = ?, region = ?, phone = ?,email = ?,site = ? where id = ?';
      const cn = mysql.createConnection(config);
      cn.connect((err) => {
        cn.query(sql, this.getParametersProfile(entityToSave, entityToSave.id), (err, results, fields) =>{
          if (err) 
            reject(err);
          else
            resolve(results);
          cn.end();
        })
      });
    });
  }

  delete(entityToDelete) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM ad WHERE id = ?';
      const cn = mysql.createConnection(config);
      cn.connect((err) => {
        cn.query(sql, entityToDelete.id, (err, results, fields) =>{
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
  getParametersProfile(entity, id) {
    let params = [];
    params.push(entity.id);
    params.push(entity.region);
    params.push(entity.phone);
    params.push(entity.email);
    params.push(entity.site);

    if (id)
      params.push(id);

    return params;
  }
}
