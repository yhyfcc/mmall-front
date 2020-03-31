import '../common/nav/index.css';
import '../common/header/index.css';
import './index.css';
import _mm from '../../util/mm';
import _payment from '../../sevice/payment-service';
import nav from '../common/nav/index';

function renderTemplate(data) {
    return `
                <p class="payment-tips">Your order has been submitted, please pay for your order. OrderNumber: ${data.orderNo}</p>
                <p class="payment-tips enhance">Please scan the QR code below to pay</p>
                <div class="img-con">
                    <img src="${data.qrUrl}" alt="Payment QR code" class="qr-code">
                </div>
    `
}

let page = {
    data: {
        orderNumber: _mm.getUrlParam('orderNumber')
    },
    init: function () {
        nav.init();
        this.loadPaymentInfo();
    },
    loadPaymentInfo: function () {
        _payment.getPaymentInfo(this.data.orderNumber,(res) => {
            document.getElementsByClassName('page-wrap')[0].innerHTML = renderTemplate(res);
            this.listenOrderStatus();
        },(rej) => {document.getElementsByClassName('page-wrap')[0].innerHTML =
        '<p class=error-tips>rej</p>'})
    },
    listenOrderStatus: function () {
        this.paymentTimer = window.setInterval(() => {
            _payment.getPaymentStatus(this.data.orderNumber,(res) => {
                if(res === true){
                    window.location.href = './result.html?type=payment&orderNumber=' + this.data.orderNumber;
                }
            },(rej) => {})
        },5000)
    }
};

window.addEventListener('load',() => page.init());