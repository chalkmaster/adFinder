module.exports = class RatingService {
  constructor(ratingRepo) {
    this.ratingRepository = ratingRepo;
  }

  findByAdId(id) {
    return new Promise((resolve, reject) => {
      this.ratingRepository.findByAdId(id).then((data) => {
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