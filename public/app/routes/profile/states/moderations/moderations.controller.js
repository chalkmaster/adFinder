class ProfileController {
  constructor($scope, aproveResource) {
    this.$scope = $scope;
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

  desaproveAd(id) {
    this.loading = true;
    this.aproveResource.desaproveAd({ id: id }).$promise.then(response => {
      this.loading = false;
      this.load();
    }).catch(error => {
      this.loading = false;
      this.load();
    });
  }

  aproveAd(id){
      this.loading = true;
      this.aproveResource.aproveAd({ id: id }).$promise.then(response => {
        this.loading = false;
        this.load();
      }).catch(error => {
        this.loading = false;
        this.load();
      });
  }

  aproveRating(rating) {

  }

}

ProfileController.$inject = ['$scope', 'aprove.resource'];

export default ProfileController;
