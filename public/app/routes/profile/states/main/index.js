import template from './main.html';
import controller from './main.controller';

let profileMain = {
    abstract: true,
    url: '/profile',
    template,
    controller,
    controllerAs:'$ctrl'
};

export default profileMain;
