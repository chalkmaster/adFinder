export default ['$resource', ($resource) => {
  return $resource('api://api/v1/rating/:id', {
    id: '@id'
  }, {});
}];
