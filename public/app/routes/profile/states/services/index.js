import template from './services.html';
import controller from './services.controller';

let profileServices = {
    url: '/services',
    template,
    controller,
    controllerAs:'$ctrl'
};

export default profileServices;
