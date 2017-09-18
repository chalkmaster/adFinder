import template from './moderations.html';
import controller from './moderations.controller';

let profileModerations = {
    url: '/moderations',
    template,
    controller,
    controllerAs:'$ctrl'
};

export default profileModerations;
