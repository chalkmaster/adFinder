

module.exports = class AdService {
  constructor(adRepo, mediaRepo) {
    this.adRepository = adRepo;
    this.mediaRepository = mediaRepo;
  }

  searchAd(expression) {
    let ad = this.adRepository.search(expression);
    if (ad) {
      this.fillMedia(ad);
    }
    return ad;
  }

  findById(id) {
    let ad = this.adRepository.findById(id);
    if (ad) {
      this.fillMedia(ad);
    }
    return ad;
  }

  save(ad) {
    if (ad.id == 0)
      this.adRepository.insert(ad);
    else
      this.adRepository.update(ad);
  }

  retrieveTabeSize(){
    return this.adRepository.count();
  }

  delete(ad) {
    this.adRepository.delete(ad);
  }

  fillMedia(ad) {
    return ad;
  }
}