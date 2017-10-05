export default ['$resource', ($resource) => {
    return $resource('api://api/v1/aprove/:id', {
      id: '@id'
    }, {
        aproveRating: {
            method: 'PUT',
            url: 'api://api/v1/rating/aprove/:id'
        },
        aproveAd: {
            method: 'PUT',
            url: 'api://api/v1/ad/aprove/:id'
        },
        desaproveAd: {
            method: 'DELETE',
            url: 'api://api/v1/ad/:id'
        }
    });
  }];
  