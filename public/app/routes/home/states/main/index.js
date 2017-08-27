import template from './home.html';
import controller from './home.controller';

let homeMain = {
    url: '/',
    template,
    controller,
    controllerAs:'$ctrl',
    params: {
        preventLoad: false
    }
};

export default homeMain;
