import template from './requests.html';
import controller from './requests.controller';

let profileRequests = {
    url: '/requests',
    template,
    controller,
    controllerAs:'$ctrl'
};

export default profileRequests;
