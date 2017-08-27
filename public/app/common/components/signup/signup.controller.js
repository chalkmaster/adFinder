class SignupController {
    constructor($rootScope, $state, $scope, authService, userValidator) {
      this.$rootScope = $rootScope;
      this.$scope = $scope;
      this.$state = $state;
      this.$scope.close = this.$scope.$parent.$close;
      this.authService = authService;
      this.userValidator = userValidator;
      this.$scope.$watch('cpfInput', this.validate.bind(this));
  }
  signUp() {
    this.authService.signup({name: this.$scope.nameInput, cpf: this.$scope.cpfInput, email: this.$scope.newEmailInput, password: this.$scope.newPassword}).then(() =>{
      console.log('sign up');
      this.$rootScope.$broadcast('userLoggedIn');
      this.$scope.close();
    }).catch(() => {
      console.log('signup failure');
    });
  }
  validate(){
    if(this.$scope.cpfInput && !this.userValidator.validateCpf(this.$scope.cpfInput)){
      this.$scope.newAccountForm.cpfInput.$setValidity("invalidCpf", false);
      this.error = "Informe um cpf válido !";
    }else {
      this.$scope.newAccountForm.cpfInput.$setValidity("invalidCpf", true);
      this.error = "";
    }
  }
}

SignupController.$inject = ['$rootScope', '$state', '$scope', 'authService','userValidator'];


export default SignupController;
