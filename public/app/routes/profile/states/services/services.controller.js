class ProfileServicesController {
  constructor($scope, $http, $state, adsResource, categoriesResource, uiCommunication) {
    this.$scope = $scope;
    this.$http = $http;
    this.$state = $state;
    this.$scope.currentUser = $scope.$parent.$ctrl.currentUser;
    this.adsResource = adsResource;
    this.categoriesResource = categoriesResource;
    this.uiCommunication = uiCommunication;
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
      this.uiCommunication.snackbar('Anúncio enviado com sucesso para aprovação.');
      this.resetForm();
    }, (response) => {
        this.uiCommunication.snackbar('Não foi possível enviar o anúncio.');
        if(response.data && response.data.error_description) {
          onsole.log('error');
        }
    });
  }
  goToPublicPage(){
    this.$state.go('main.home', {preventLoad : true}).then(state => {
      this.$state.go('main.details', {id : this.$scope.currentUser.cpf});
    });
  }
  resetForm(){
    this.description = null;
    this.category = null;
  }
}

ProfileServicesController.$inject = ['$scope', '$http', '$state', 'ads.resource', 'categories.resource', 'uiCommunication'];

export default ProfileServicesController;
