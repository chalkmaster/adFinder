class ProfileController {
  constructor(aproveResource) {
    this.name = 'Profile Screen';
    this.aproveResource = aproveResource;
    this.load();
  }
  load() {
    this.aproveResource.get().$promise.then(response => {
      this.ads = response.ad;
      this.ratings = response.rating;
    }) 
  }

  disaproveAd(ad) {

  }

  aproveRating(rating) {

  }

}

ProfileController.$inject = ['aprove.resource'];

export default ProfileController;
