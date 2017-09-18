import template from './main.html';
import controller from './main.controller';

let homeMain = {
    url: '/details/:id',
    template,
    controller,
    resolve: {
      ad: ['$stateParams', 'ads.resource', ($stateParams, adsResource) => {
          return adsResource.get({id: $stateParams.id}).$promise;
      }]
    },
    controllerAs:'$ctrl'
};

export default homeMain;
