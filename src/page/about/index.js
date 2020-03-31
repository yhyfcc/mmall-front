import '../common/nav/index.css';
import '../common/header/index.css';
import nav from '../common/nav/index';

let page = {
    init: function () {
        nav.init();
    }
};

window.addEventListener('load',() => page.init());