class NavigationController {
  constructor($rootScope, $scope, $state, $uibModal, authService, authCredentials) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.$state = $state;
    this.query = "";
    this.$uibModal = $uibModal;
    this.authService = authService;
    this.authCredentials = authCredentials;
    this.getCurrentUser();
    this.userLogged = authCredentials.isLogged();
    $rootScope.$on('userLoggedIn', this.sessionUser.bind(this));
  }
  getCurrentUser() {
    let token = this.authCredentials.currentAccessToken();
    if(token) {
      this.currentUser = JSON.parse(token);
    }
  }
  sessionUser() {
    this.userLogged = true;
    this.currentUser = JSON.parse(this.authCredentials.currentAccessToken());
  }
  signOut(){
    this.userLogged = false;
    this.authService.invalidate();
    this.$state.go('main.home');
  }
  openLogin(){
    this.$uibModal.open({ template : '<login></login>' });
  }
  openCategories(){
    this.$uibModal.open({ template : '<category></category>' });
  }
  find(){
    this.$state.go('main.home', {preventLoad : true}).then(state => {
      if(this.query){
        this.$rootScope.$broadcast('search', this.query);
      } else {
        this.$rootScope.$broadcast('loadList');
      }
    });
  }
}

NavigationController.$inject = ['$rootScope', '$scope', '$state', '$uibModal', 'authService', 'authCredentials'];

export default NavigationController;
