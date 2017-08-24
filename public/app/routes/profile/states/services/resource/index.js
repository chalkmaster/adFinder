export default ['$resource', ($resource) => {
  return $resource('api://api/v1/category/:id', {
    id: '@id'
  }, {});
}];
