class CategoryController {
    constructor($rootScope, $state, $scope, categoriesResource, categoryHelper) {
      this.$rootScope = $rootScope;
      this.$scope = $scope;
      this.$state = $state;
      this.categoryHelper = categoryHelper;
      this.categoriesResource = categoriesResource;
      this.$scope.close = this.$scope.$parent.$close;
      this.selectedCategory = this.categoryHelper.get();
      this.load();
  }
  load() {
    this.loading = true;
    this.categoriesResource.query().$promise.then(data => {
      this.categories = data;
      this.loading = false;
    });
  }
  dispatchSearchEvent(category){
    this.categoryHelper.set(category);
    this.$state.go('main.home', {preventLoad : true}).then(state => {
      if(category){
        this.$rootScope.$broadcast('search', category);
      } else {
        
      }
    });
    this.$scope.close();
  }
}

CategoryController.$inject = ['$rootScope', '$state', '$scope', 'categories.resource', 'categoryHelper'];


export default CategoryController;
