class AuthService {
    constructor($http, $q, authCredentials) {
    this.$http = $http;
    this.$q = $q;
    this.authCredentials = authCredentials;
  }
  signin(user) {
    let deferred = this.$q.defer();
    //let authData = angular.toJson(user);
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
  invalidate() {
    this.authCredentials.clear();
  }
  getCurrentUser() {
    return this.authCredentials.currentAccessToken();
  }
}

AuthService.$inject = ['$http', '$q', 'authCredentials'];

export default AuthService;
