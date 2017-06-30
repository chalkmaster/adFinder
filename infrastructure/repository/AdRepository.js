const SQLiteOpenHelper = require('../sqlitedatabase/SQLiteOpenHelper');

module.exports = class AdRepository {

  constructor() {
    let openHelper = new SQLiteOpenHelper();
    this.db = openHelper.getDataBase();
  }

  findById(id) {
    const sql = 'SELECT * FROM ad WHERE id = ?';
    this.db.each(sql, id, (err, row) => {
      return this.bindModel(row);
    });
  }

  count() {
    const sql = 'SELECT count(1) as qtd FROM ad';
    this.db.each(sql, (err, row) => {
      return row.qtd;
    });
  }

  search(expression) {
    const sql = 'SELECT * FROM ad WHERE ad MATCH ?';
    let data = [];
    this.db.each(sql, expression, (err, row) => {
      data.push(this.bindModel(row));
    });
    return data;
  }

  update(entityToSave) {
    const sql = 'UPDATE ad SET id = ?,name = ?,description = ?,region = ?,category = ?,phone = ?,email = ?,site = ? WHERE id = ?';
    this.db.run(sql, this.getParameters(entityToSave, entityToSave.id));
  }

  insert(entityToSave) {
    const sql = 'INSERT INTO ad (id,name,description,region,category,phone,email,site) values (?,?,?,?,?,?,?,?)';
    this.db.run(sql, this.getParameters(entityToSave));
  }

  delete(entityToDelete) {
    const sql = 'DELETE FROM ad WHERE id = ?';
    this.db.run(sql, entityToDelete.id);
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
