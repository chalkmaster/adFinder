export default ['$resource', ($resource) => {
  return $resource('api://api/v1/ad/:id', {
    id: '@id',
    adId: '@adId',
    query: '@query'
  }, {
    filter: {
      method: 'GET',
      url: 'api://search/:query',
      isArray: true
    }
  });
}];
