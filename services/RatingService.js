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

  insert(rate) {
    return new Promise((resolve, reject) => {
      this.ratingRepository.insert(rate).then((data) => {
        resolve(data);
      }).catch((err) => { reject(err) });
    });
  }
}