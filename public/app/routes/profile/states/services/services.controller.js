class ProfileServicesController {
  constructor($scope, $http, adsResource, categoriesResource) {
    this.$scope = $scope;
    this.$http = $http;
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
     	name: this.$scope.currentUser.name || "Padrão",
     	id: this.$scope.currentUser.cpf,
     	description: this.description,
     	region: "Belo Horizonte",
     	category: this.category,
     	contacts: {
     		phone: "",
     		email: this.$scope.currentUser.email,
     		site: ""
        }
     };
     this.$http.post('api://api/v1/ad/', angular.toJson(model)).then(response => {
      console.log('ad saved');
    }, (response) => {
        if(response.data && response.data.error_description) {
          onsole.log('error');
        }
    });
  }
}

ProfileServicesController.$inject = ['$scope', '$http', 'ads.resource', 'categories.resource'];

export default ProfileServicesController;
