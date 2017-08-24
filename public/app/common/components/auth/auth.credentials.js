class AuthCredentials {
  constructor($cookies) {
    this.$cookies = $cookies;
  }
  currentAccessToken() {
    return this.$cookies.get('adf-access-token');
  }
  setToken(access_token) {
    let date = new Date();
    let expires_at = new Date(date.setDate(date.getDate() + 1));
    this.$cookies.put('adf-access-token', JSON.stringify(access_token), {
      expires: expires_at,
      path: '/'
    });
  }
  clear() {
    this.$cookies.remove('adf-access-token', {
      path: '/'
    });
  }
  isLogged() {
    return !!this.currentAccessToken();
  }
}

AuthCredentials.$inject = ['$cookies'];

export default AuthCredentials;
