export default ['$resource', ($resource) => {
  return $resource('api://api/v1/auth/', {}, {
    user: {
      method: 'POST',
      url: 'api://api/v1/user/'
    }
  });
}];
