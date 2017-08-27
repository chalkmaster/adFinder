class DetailsMainController {
  constructor($scope, ad, resource, authCredentials) {
    this.name = 'Details Main Screen';
    this.$scope = $scope;
    this.$scope.ad = ad;
    this.resource = resource;
    this.userIsLogged = authCredentials.isLogged();
    this.loadRatings();
  }
  loadRatings(){
    this.loading = true;
    this.resource.query({id: this.$scope.ad.id}).$promise.then(response => {
      this.ratings = response;
      this.comments = response.filter((x) => x.description !== "").length;
      this.loading = false;
    }).catch(err => {
      this.loading = false;
    });
  }
}

DetailsMainController.$inject = ['$scope', 'ad' , 'ratings.resource', 'authCredentials'];

export default DetailsMainController;
