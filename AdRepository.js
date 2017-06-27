module.exports.AdRepository = class AdRepository {

  constructor() {
    this.dataStore = [];
  }

  findById(id) {
    for (let ad of this.dataStore)
      if (ad.id == id) return ad;
    return null;
  }

  save(entityToSave) {
    if (entityToSave.id !== 0){
      this.delete (entityToSave);
    }

    this.dataStore.push(entityToSave);
  }

  delete(entityToDelete) {
    let found = this.findById(entityToDelete.id);
    if (found)
      this.dataStore.pop(found);
  }
}
