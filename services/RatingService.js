const RatingRepository = require('../infrastructure/repository/RatingRepository');
const AproveRepository = require('../infrastructure/repository/AproveRepository');


module.exports = class RatingService {
  /**
   * 
   * @param {RatingRepository} ratingRepo 
   * @param {AproveRepository} aproveRepository
   */
  constructor(ratingRepo, aproveRepository) {
    this.ratingRepository = ratingRepo;
    this.aproveRepository = aproveRepository;
  }

  findByAdId(id) {
    return new Promise((resolve, reject) => {
      this.ratingRepository.findByAdId(id).then((data) => {
        resolve(data);
      }).catch((err) => { reject(err) });
    });
  }

  /**
   * 
   * @param {Number} id 
   */
  aprove(id){
    return new Promise((resolve, reject) => {
      this.aproveRepository.aproveRating(id).then(() => {
        resolve("ok");
      }).catch((err) => { reject(err) });
    });
  }

  desaprove(rating){
    return new Promise((resolve, reject) => {
      this.aproveRepository.desaproveRating(rating).then(() => {
        resolve("ok");
      }).catch((err) => { reject(err) });
    });
  }
  
  getToAprove(id){
    return new Promise((resolve, reject) => {
      this.aproveRepository.findRating().then((data) => {
        let ret = {rating: data}
        this.aproveRepository.findAd().then((dataAd)=>{
          ret.ad = dataAd;
          resolve(ret);
        }).catch(() => {
          resolve(ret);
        });
      }).catch((err) => { reject(err) });
    });
  }

  countByAdId(id) {
    return new Promise((resolve, reject) => {
      this.ratingRepository.countByAdId(id).then((data) => {
        resolve(data);
      }).catch((err) => { reject(err) });
    });
  }

  insert(rate) {
    return new Promise((resolve, reject) => {
      this.ratingRepository.insert(rate).then((data) => {
        resolve(data);
      }).catch((err) => { reject(err) });
    });
  }
}