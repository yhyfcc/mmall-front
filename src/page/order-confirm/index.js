import '../common/header/index';
import '../common/nav/index';
import nav from '../common/nav/index';
import modal from '../../util/modal/index';
import form from './form/index';
import _mm from '../../util/mm';
import _order from '../../sevice/order-service';
import _address from '../../sevice/address-service';
import './index.css';

function renderAddressList(data,selectedAddressId){
    let newAddressHTML = `                
                <div class="address-item address-add">
                    <div class="address-new">
                        <span class="plus">+</span>
                        <div class="text">Use a new address</div>
                    </div>
                </div>`;
    return Array.from(data.list).reduce((prev,curr) => {
        return prev + `
            <div class="address-item ${parseInt(curr.id)===parseInt(selectedAddressId)?'active':''}" address-id="${curr.id}">
                <div class="address-title">
                    ${curr.receiverProvince} ${curr.receiverCity} (${curr.receiverName})
                </div>
                <div class="address-detail">
                    ${curr.receiverMobile}
                </div>
                <div class="address-operation ">
                    <span class="link address-update">Edit</span>
                    <span class="link address-delete">Delete</span>
                </div>
             </div>
        `
    },'') + newAddressHTML;


}

function renderProductList(data){
    let imageHost = data.imageHost;
    let tableHeader = `                
                    <tr>
                        <th class="cell-img">&nbsp;</th>
                        <th class="cell-info">Description</th>
                        <th class="cell-price">Price</th>
                        <th class="cell-count">Amount</th>
                        <th class="cell-total">Total</th>
                    </tr>`;
    let productList = Array.from(data.orderItemVoList).reduce((prev,curr) => {
        return prev + `
                    <tr>
                        <td class="cell-img">
                            <a href="./detail.html?productId=${curr.productId}" target="_blank">
                                <img src="${imageHost+curr.productImage}" alt="${curr.productName}" class="p-img">
                            </a>
                        </td>
                        <td class="cell-info">
                            <a href="./detail.html?productId=${curr.productId}" class="link" target="_blank">
                                ${curr.productName}
                            </a>
                        </td>
                        <td class="cell-price">
                            $${curr.currentUnitPrice}
                        </td>
                        <td class="cell-count">
                            ${curr.quantity}
                        </td>
                        <td class="cell-total">
                            ${curr.totalPrice}
                        </td>
                    </tr>
        `
    },'');
    return `
            <table class="product-table">
                ${tableHeader}
                ${productList}
            </table>
            <div class="submit-con">
                <span class="submit-total-text">Total</span>
                <span class="submit-total">${data.productTotalPrice}</span>
                <span class="btn order-submit">Checkout</span>
            </div>
    `
}

let loader = "<div class=\"loading\"><div class=\"lds-ring\"><div></div><div></div><div></div><div></div></div></div>";
let page = {
    data:{
        selectedAddressId: ''
    },
    init: function () {
        this.onLoad();
    },
    onLoad: function () {
        nav.init();
        this.loadAddressList();
        this.loadProductList();
        this.bindEvent();
        modal.init({onUpdateHide: () => this.loadAddressList()});
        form.init();
    },
    bindEvent: function() {
        document.body.addEventListener('click',(event) => {
            console.log(event.target);
            if(event.target.classList.contains('address-item') && !event.target.classList.contains('address-add')){
                event.target.classList.add('active');
                Array.from(event.target.parentNode.children).forEach(element => {
                    if(element === event.target){
                        return;
                    }
                    element.classList.remove('active');
                });
                this.data.selectedAddressId = event.target.getAttribute('address-id');
            }
            if(event.target.classList.contains('address-new')){
                form.changeType('new');
                modal.show({title: 'Create new address'});
            }

            if(event.target.classList.contains('address-update')){
                let selectedAddress = Array.from(document.getElementsByClassName('address-item')).find(element => {
                    if(element.getAttribute('address-id') ===
                        event.target.parentNode.parentNode.getAttribute('address-id')){
                        return true;
                    }
                });
                let addressId = selectedAddress.getAttribute('address-id');
                form.changeType('new');
                form.changeType('update',addressId);
                this.data.selectedAddressId = addressId;
                selectedAddress.classList.add('active');
                modal.show({title: 'Update address'});
            }

            if(event.target.classList.contains('address-delete')){
                Array.from(document.getElementsByClassName('address-item')).forEach(element => {
                    if(element.getAttribute('address-id') ===
                        event.target.parentNode.parentNode.getAttribute('address-id')){
                        if(window.confirm('Do you really want to delete this address?')){
                            _address.deleteAddress(element.getAttribute('address-id'),() => {
                                this.loadAddressList();
                            },(rej) => _mm.errorTips(rej))
                        }
                    }
                })
            }

            if(event.target.classList.contains('order-submit')){
                if(!this.data.selectedAddressId){
                    _mm.errorTips('Please select a shipping address');
                    return;
                }else{
                    _order.createOrder({shippingId: this.data.selectedAddressId},(res) => {
                        console.log('res');
                        window.location.href = './payment.html?orderNumber=' + res.orderNo
                    },(rej) => {_mm.errorTips(rej)})
                }
            }
        })





    },
    loadAddressList: function () {
        let addressContainer = document.getElementsByClassName('address-con')[0];
        addressContainer.innerHTML = loader;
        _address.getAddressList((res) => {
            addressContainer.innerHTML = renderAddressList(res, this.data.selectedAddressId);
        },(msg) => {
            if(msg === 10){
                window.location.href = './user-login.html?redirect='+window.location.href;
            }
            addressContainer.innerHTML = '<p class="error-tips">Something went wrong'});
    },
    loadProductList: function () {
        let productContainer = document.getElementsByClassName('product-con')[0];
        productContainer.innerHTML = loader;
        _order.getOrderProductList((res) => {
            productContainer.innerHTML = renderProductList(res)
        },(msg) => {
            if(msg === 10){
                window.location.href = './user-login.html?redirect='+window.location.href;
            }
            productContainer.innerHTML = '<p class="error-tips">Something went wrong'});
    }
};

window.onload = () => page.init();