const adValidator = require('../validators/adValidator');

module.exports = class AdService {
  constructor(adRepo, mediaRepo) {
    this.adRepository = adRepo;
    this.mediaRepository = mediaRepo;
  }

  search(expression) {
    return new Promise((resolve, reject) => {
      this.adRepository.search(expression).then((data) => {
        if (data) {
          this.fillMedia(data);
        }
        resolve(data);
      }).catch((err) => { reject(err) });
    });
  }

  findAll() {
    return new Promise((resolve, reject) => {
      this.adRepository.findAll().then((data) => {
        if (data) {
          this.fillMedia(data);
        }
        resolve(data);
      }).catch((err) => { reject(err) });
    });
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      this.adRepository.findById(id).then((data) => {
        if (data) {
          this.fillMedia(data);
        }
        resolve(data);
      }).catch((err) => { reject(err) });
    });
  }

  insert(ad) {    
    return new Promise((resolve, reject) => {
      const validator = new adValidator();
      const {valid, errorList} = validator.validate(ad);

      if (!valid){
        reject(errorList);
        return;
      }
      this.adRepository.insert(ad).then((data) => {
        resolve(data);
      }).catch((err) => { reject(err) });
    });
      
  }

  update(ad) {    
    return new Promise((resolve, reject) => {
      const validator = new adValidator();
      const {valid, errorList} = validator.validate(ad);

      if (!valid){
        reject(errorList);
        return;
      }

      this.adRepository.update(ad).then((data) => {
        resolve(data);
      }).catch((err) => { reject(err) });
    });
  }

  retrieveTabeSize() {
    return new Promise((resolve, reject) => {
      this.adRepository.count().then((data) => {
        resolve(data);
      }).catch((err) => { reject(err) });
    });
  }

  delete(ad) {
    return new Promise((resolve, reject) => {
      this.adRepository.delete(ad).then((data) => {
        resolve(data);
      }).catch((err) => { reject(err) });
    });
  }

  fillMedia(ad) {
    return ad;
  }
}