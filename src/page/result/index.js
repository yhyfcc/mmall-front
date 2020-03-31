import '../common/nav-simple/index';
import './index.css';
import _mm from '../../util/mm';

window.onload = () => {
    let type = _mm.getUrlParam('type') || 'default';
    let element = document.getElementsByClassName(`${type}-success`)[0];
    element.classList.remove("hide");
    if(type === 'payment'){
        document.getElementsByClassName('order-detail-link')[0].href = './order-detail?orderNumber='+_mm.getUrlParam('orderNumber');
    }

};