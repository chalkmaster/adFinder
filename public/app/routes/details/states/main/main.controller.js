class DetailsMainController {
  constructor($scope, ad) {
    this.name = 'Details Main Screen';
    this.$scope = $scope;
    this.$scope.ad = ad;
  }
}

DetailsMainController.$inject = ['$scope', 'ad'];

export default DetailsMainController;
