export default ['$resource', ($resource) => {
  return $resource('api://api/v1/ad/:id', {
    id: '@id'
  }, {});
}];
