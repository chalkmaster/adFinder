import template from './account.html';
import controller from './account.controller';

let profileAccount = {
    url: '/account',
    template,
    controller,
    controllerAs:'$ctrl'
};

export default profileAccount;
