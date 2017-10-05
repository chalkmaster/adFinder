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
    access_token.isAdmin = parseInt(access_token.token.charAt(0)) == 1 ? true : false;
    this.$cookies.put('adf-access-token', JSON.stringify(access_token), {
      expires: expires_at,
      path: '/'
    });
  }
  updateToken(data){
    let token = JSON.parse(this.currentAccessToken());
    token.phone = data.phone;
    token.name = data.name;
    token.site = data.site;
    token.region = data.region;
    this.setToken(token);
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
