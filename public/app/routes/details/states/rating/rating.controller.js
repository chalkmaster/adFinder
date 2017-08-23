class RatingMainController {
  constructor($scope, $stateParams, $state, resource) {
    this.name = 'Details Main Screen';
    this.$scope = $scope;
    this.$state = $state;
    this.resource = resource;
    this.$scope.adId = $stateParams.id;
    this.$scope.ad = this.$scope.$parent;
    this.$scope.like = null;
    this.$scope.textRating = "";
  }
  save(){
    let modelToSave = {
      adId: this.$scope.adId,
      liked: this.$scope.like,
      description: this.$scope.textRating
    };
    this.loading = true;
    this.resource.save(modelToSave).$promise.then(response => {
      console.log(response);
      this.loading = false;
      this.$state.go('^', {}, {reload: true});
    }).catch(error => {
      alert(error);
      this.loading = false;
      this.$state.go('^');
    });
  }
}

RatingMainController.$inject = ['$scope', '$stateParams', '$state', 'ratings.resource'];

export default RatingMainController;
