class DetailsMainController {
  constructor($scope, $http, $state, ad, resource, authCredentials, categoriesResource, uiCommunication) {
    this.name = 'Details Main Screen';
    this.$scope = $scope;
    this.$http = $http;
    this.$state = $state;
    this.$scope.ad = ad;
    this.entity = new Object(this.$scope.ad);
    this.resource = resource;
    this.authCredentials = authCredentials;
    this.categoriesResource = categoriesResource;
    this.uiCommunication = uiCommunication;
    this.userIsLogged = authCredentials.isLogged();
    this.getCurrentUser();
    this.loadRatings();
  }
  getCurrentUser() {
    let token = this.authCredentials.currentAccessToken();
    if(token) {
      this.currentUser = JSON.parse(token);
    }
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
  toogleEdit() {
    this.loading = true;
    this.categoriesResource.query().$promise.then(response => {
      this.categories = response;
      this.entity = this.$scope.ad;
      this.editing = true;
      this.loading = false;
    }).catch(err => {
      this.loading = false;
    });
  }
  updateAd(){
    let model = {
      name: this.currentUser.name || "Padrão",
      id: this.currentUser.cpf,
      description: this.$scope.ad.description,
      region: this.$scope.ad.region,
      category: this.$scope.ad.category,
      contacts: {
        phone: this.$scope.ad.phone,
        email: this.currentUser.email,
        site: this.$scope.ad.site
       }
    };
    this.loading = true;
    var usr = this.currentUser;
    this.$http.put('api://api/v1/ad/' + this.currentUser.cpf, angular.toJson(model)).then(response => {
     console.log('ad updated');
     this.uiCommunication.snackbar('Anúncio alterado com sucesso.');
     usr.name = model.name;
     usr.region = model.region;
     usr.site = model.contacts.site;
     usr.phone = model.contacts.phone;
     this.authCredentials.setToken(usr);
     console.log(usr);
     this.loading = false;
     this.$state.reload();
   }, (response) => {
       this.uiCommunication.snackbar('Não foi possível alterar o anúncio.');
       this.$scope.ad = new Object(this.entity);
       this.editing = false;
       this.loading = false;
       if(response.data && response.data.error_description) {
        console.log('error');
       }
   })
  }
}

DetailsMainController.$inject = ['$scope', '$http', '$state', 'ad' , 'ratings.resource', 'authCredentials' , 'categories.resource', 'uiCommunication'];

export default DetailsMainController;
