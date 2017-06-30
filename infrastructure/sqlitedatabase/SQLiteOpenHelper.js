const db = require('sqlite');

module.exports = class SQLiteOpenHelper {
  getDataBase() {
    //use only to reset database
    db.open('./adFinder.sqlite', { cached: true });
    db.migrate({ force: 'last' });
    //db.migrate();
    return db;
  }
}