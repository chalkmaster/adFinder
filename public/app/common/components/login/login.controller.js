class LoginController {
    constructor($rootScope, $scope, authService) {
      this.$rootScope = $rootScope;
      this.$scope = $scope;
      this.$scope.close = this.$scope.$parent.$close;
      this.authService = authService;
  }
  signIn() {
    this.authService.signin({email: this.email, password: this.password}).then(() =>{
      console.log('sign in');
      this.$rootScope.$broadcast('userLoggedIn');
      this.$scope.close();
    }).catch(() => {
      console.log('auth failure');
    });
  }
}

LoginController.$inject = ['$rootScope', '$scope', 'authService'];


export default LoginController;
