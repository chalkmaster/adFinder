class ProfileServicesController {
  constructor($scope, adsResource, categoriesResource) {
    this.$scope = $scope;
    this.$scope.currentUser = $scope.$parent.$ctrl.currentUser;
    this.adsResource = adsResource;
    this.categoriesResource = categoriesResource;
    this.load();
  }
  load(){
    this.categoriesResource.query().$promise.then(data => {
      this.categories = data;
    });
  }
  save(){
    let model = {
     	name: this.$scope.currentUser.name,
     	id: this.$scope.currentUser.cpf,
     	description: this.description,
     	region: "Belo Horizonte",
     	category: this.category,
     	contacts: {
     		phone: null,
     		email: this.$scope.currentUser.email,
     		site: null
        }
     };
     this.adsResource.save(JSON.stringify(model)).$promise.then(results => {
       console.log('ad saved');
     }).catch(e => {
      console.log('error');
     });
  }
}

ProfileServicesController.$inject = ['$scope', 'ads.resource', 'categories.resource'];

export default ProfileServicesController;
