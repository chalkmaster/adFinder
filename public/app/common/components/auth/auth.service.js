class AuthService {
    constructor($http, $q, authCredentials, authResource) {
    this.$http = $http;
    this.$q = $q;
    this.authCredentials = authCredentials;
    this.authResource = authResource;
  }
  signin(user) {
    let deferred = this.$q.defer();
    this.$http.post('api://api/v1/auth/', angular.toJson(user)).then(response => {
      this.authCredentials.setToken(response.data);
      deferred.resolve();
    }, (response) => {
        if(response.data && response.data.error_description) {
            alert(response.data.error_description);
        }
        deferred.reject('authentication_error');
    });
    return deferred.promise;
  }
  signup(user){
    let deferred = this.$q.defer();
    this.$http.post('api://api/v1/user/', angular.toJson(user)).then(response => {
      this.signin({email: user.email, password: user.password}).then(response => {
        deferred.resolve();
      });
    }, (response) => {
        if(response.data && response.data.error_description) {
            alert(response.data.error_description);
        }
        deferred.reject('signup_error');
    });
    return deferred.promise;
  }
  invalidate() {
    this.authCredentials.clear();
  }
  getCurrentUser() {
    return this.authCredentials.currentAccessToken();
  }
}

AuthService.$inject = ['$http', '$q', 'authCredentials', 'auth.resource'];

export default AuthService;
