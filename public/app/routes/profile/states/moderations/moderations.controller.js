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

  disaproveAd() {
    this.loading = true;
    this.resource.aproveAd({ id: this.$scope.adId }).$promise.then(response => {
      this.loading = false;
      this.close();
    }).catch(error => {
      this.loading = false;
      this.close();
    });
  }

  aproveAd(){
    if(this.$scope.moderation == "1") {
      this.loading = true;
      this.resource.aproveAd({ id: this.$scope.adId }).$promise.then(response => {
        this.loading = false;
        this.close();
      }).catch(error => {
        this.loading = false;
        this.close();
      });
    } else {
      this.close();
    }
  }

  aproveRating(rating) {

  }

}

ProfileController.$inject = ['aprove.resource'];

export default ProfileController;
