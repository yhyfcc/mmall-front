import '../common/nav/index.css';
import '../common/header/index.css';
import './index.css';
import _mm from '../../util/mm';
import _order from '../../sevice/order-service';
import navSide from "../common/nav-side/index";
import nav from '../common/nav/index';

function renderTemplate(data) {
    let itemList = Array.from(data.orderItemVoList).reduce((prev,item) => {
        return prev + `
                        <tr class="">
                            <td class="cell cell-img">
                                <a href="./detail.html?productId=${item.productId}" target="_blank">
                                    <img class="p-img"
                                         src="${data.imageHost+item.productImage}" alt="${item.productName}">
                                </a>
                            </td>
                            <td class="cell cell-info">
                                <a href="./detail.html?productId=${item.productId}" target="_blank" class="link">
                                    ${item.productName}
                                </a>
                            </td>
                            <td class="cell cell-price">$${item.currentUnitPrice}</td>
                            <td class="cell cell-count">${item.quantity}</td>
                            <td class="cell cell-total">$${item.totalPrice}</td>
                        </tr>
        `
    },'');
    return `
            <div class="panel">
                <div class="panel-title">Order Info</div>
                <div class="panel-body">
                    <div class="order-info">
                        <div class="text-line">
                            <span class="text">Order Number: ${data.orderNo}</span>
                            <span class="text">Create Time: ${data.createTime}</span>
                        </div>
                        <div class="text-line">
                            <span class="text">Receiver: ${data.receiverName} ${data.shippingVo.receiverProvince} ${data.shippingVo.receiverCity} ${data.shippingVo.receiverAddress} ${data.shippingVo.receiverMobile}</span>
                        </div>
                        <div class="text-line">
                            <span class="text">Status: ${data.statusDesc}</span>
                        </div>
                        <div class="text-line">
                            <span class="text">Payment Method: ${data.paymentTypeDesc}</span>
                        </div>
                        <div class="text-line">
                            ${parseInt(data.status) === 10 ? 
                                `<a class="btn" href="./payment.html?orderNumber=${data.orderNo}">Go to payment</a>` +
                                `<span class="btn order-cancel" href="#">Cancel order</span>`
                                : ''}    
                        </div>
                    </div>
                </div>
            </div>
            <div class="panel">
                <div class="panel-title">Item List</div>
                <div class="panel-body">
                    <table class="product-table">
                        <tr>
                            <th class="cell-th cell-img">&nbsp;</th>
                            <th class="cell-th cell-info">Description</th>
                            <th class="cell-th cell-price">Price</th>
                            <th class="cell-th cell-count">Amount</th>
                            <th class="cell-th cel-total">Total</th>
                        </tr>
                        ${itemList}
                    </table>
                    <p class="total">
                        <span>Order total: </span>
                        <span class="total-price">$${data.payment}</span>
                    </p>
                </div>
            </div>
    `
}

let page = {
    data: {
        orderNumber: _mm.getUrlParam('orderNumber')
    },
    init: function () {
        navSide.init({
            name: 'order-list'
        });
        nav.init();
        this.loadDetail();
    },
    bindEvent: function(){
        document.getElementsByClassName('order-cancel')[0].addEventListener('click',() => {
            if(window.confirm('Do you really want to cancel this order?')){
                _order.cancelOrder(this.data.orderNumber,(res) => {
                    _mm.successTips('Order has been canceled');
                    this.loadDetail();
                },(rej) => _mm.errorTips(rej))
            }
        })
    },
    loadDetail: function () {
        _order.getOrderDetail(this.data.orderNumber,(res) => {
            document.getElementsByClassName('content with-nav')[0].innerHTML = renderTemplate(res);
            this.bindEvent();
        },(rej) => document.getElementsByClassName('content with-nav')[0].innerHTML
            = '<p class="error-tips">rej</p>')
    }
};

window.addEventListener('load',() => page.init());