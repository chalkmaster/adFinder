class ProfileServicesController {
  constructor($scope, $q, $http, $state, adsResource, categoriesResource, uiCommunication) {
    this.$scope = $scope;
    this.$q = $q;
    this.$http = $http;
    this.$state = $state;
    this.$scope.currentUser = $scope.$parent.$ctrl.currentUser;
    this.adsResource = adsResource;
    this.categoriesResource = categoriesResource;
    this.uiCommunication = uiCommunication;
    this.loadData().then(results => {
      this.categories = results.categories;
      this.ads = results.ads;
      this.adExists = !!this.ads.filter((x) => x.id == this.$scope.currentUser.cpf);
    });
    loadImages($scope.$parent.$ctrl.currentUser.cpf);
  }
  ngLoadImages() {
    loadImages(this.$scope.currentUser.cpf);
  }
  loadData() {
    let dataToLoad = {};
    dataToLoad.ads = this.adsResource.query().$promise;
    dataToLoad.categories = this.categoriesResource.query().$promise;
    return this.$q.all(dataToLoad);
  }
  save() {
    let model = {
      name: this.$scope.currentUser.name || "Padrão",
      id: this.$scope.currentUser.cpf,
      description: this.description,
      region: this.$scope.currentUser.region || "Belo Horizonte",
      category: this.category,
      contacts: {
        phone: this.$scope.currentUser.phone,
        email: this.$scope.currentUser.email,
        site: this.$scope.currentUser.site
      }
    };
    this.$http.put('api://api/v1/ad/' + this.$scope.currentUser.cpf, angular.toJson(model)).then(response => {
      console.log('ad updated');
      this.uiCommunication.snackbar('Anúncio salvo com sucesso.');
      this.resetForm();
    }, (response) => {
      this.uiCommunication.snackbar('Não foi possível salvar o anúncio.');
      if (response.data && response.data.error_description) {
        console.log('error');
      }
    }), () => {
    };
  }
  goToPublicPage() {
    this.$state.go('main.home', { preventLoad: true }).then(state => {
      this.$state.go('main.details', { id: this.$scope.currentUser.cpf });
    });
  }
  resetForm() {
    this.description = null;
    this.category = null;
  }
}

ProfileServicesController.$inject = ['$scope', '$q', '$http', '$state', 'ads.resource', 'categories.resource', 'uiCommunication'];

export default ProfileServicesController;
