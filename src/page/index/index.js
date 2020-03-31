import '../common/header/index';
import '../common/nav/index';
import nav from '../common/nav/index';
import _mm from '../../util/mm';
import './index.css';
import '@glidejs/glide/dist/css/glide.core.min.css';
import Glide from '@glidejs/glide';

nav.init();
new Glide('.glide',{
    perView: 1,
    autoplay: 3000
}).mount();
