const adValidator = require('../validators/adValidator');
const AproveRepository = require('../infrastructure/repository/AproveRepository');

module.exports = class AdService {
  /**
   * 
   * @param {*} adRepo 
   * @param {*} mediaRepo 
   * @param {AproveRepository} aproveRepo 
   */
  constructor(adRepo, mediaRepo, aproveRepo) {
    this.adRepository = adRepo;
    this.mediaRepository = mediaRepo;
    this.aproveRepository = aproveRepo;
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

  getCategories() {
    return new Promise((resolve, reject) => {
      this.adRepository.getCategories().then((data) => {
        resolve(data);
      }).catch((err) => { reject(err) });
    });
  }

  /**
  * 
  * @param {Number} id 
  */
  aprove(id) {
    return new Promise((resolve, reject) => {
      this.aproveRepository.aproveAd(id).then(() => {
        resolve("ok");
      }).catch((err) => { reject(err) });
    });
  }

  desaprove(id) {
    return new Promise((resolve, reject) => {
      this.aproveRepository.desaproveAd(id).then(() => {
        resolve("ok");
      }).catch((err) => { reject(err) });
    });
  }

  insert(ad) {
    return new Promise((resolve, reject) => {
      this.adRepository.insert(ad).then(() => {
        this.aproveRepository.desaproveAd(ad.id).then(
          () => { resolve(); }
        ).catch((err) => { reject(err) });
      }).catch((err) => { reject(err) });
    });

  }

  updateProfile(ad){
    return new Promise((resolve, reject) => {
      this.adRepository.updateProfile(ad).then((data) => {
        resolve(data);
      }).catch((err) => { reject(err) });
    });    
  }

  update(ad) {
    return new Promise((resolve, reject) => {
      const validator = new adValidator();
      const { valid, errorList } = validator.validate(ad);

      if (!valid) {
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