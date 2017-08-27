class AproveController {
  constructor($scope, $stateParams, $state, resource) {
    this.name = 'Details Main Screen';
    this.$scope = $scope;
    this.$state = $state;
    this.resource = resource;
    this.$scope.adId = $stateParams.id;
  }
  save(){
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
  close(){
    this.$state.go('^', {reload: true});
  }
}

AproveController.$inject = ['$scope', '$stateParams', '$state', 'aprove.resource'];

export default AproveController;
