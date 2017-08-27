class CategoryController {
    constructor($rootScope, $state, $scope, categoriesResource) {
      this.$rootScope = $rootScope;
      this.$scope = $scope;
      this.$state = $state;
      this.$scope.close = this.$scope.$parent.$close;
      this.categoriesResource = categoriesResource;
      this.load();
  }
  load() {
    this.categoriesResource.query().$promise.then(data => {
      this.categories = data;
    });
  }
  dispatchSearchEvent(category){
    this.$state.go('main.home', {preventLoad : true}).then(state => {
      if(category){
        this.$rootScope.$broadcast('search', category);
      } else {
        
      }
    });
    this.$scope.close();
  }
}

CategoryController.$inject = ['$rootScope', '$state', '$scope', 'categories.resource'];


export default CategoryController;
