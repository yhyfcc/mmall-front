import '../common/header/index';
import '../common/nav/index';
import nav from '../common/nav/index';
import _mm from '../../util/mm';
import _cart from '../../sevice/cart-service';
import './index.css';
import Pagination from "../../util/pagination";

function renderHTML(data){
    let result = '';
    if(data.cartProductVoList.length <= 0){
        return `        <div class="error-tips">
            <span>Your cart is empty,</span>
            <a href="./index.html" class="link">go shopping</a>
        </div>`;
    }

    let cartList = data.cartProductVoList.reduce((prev,curr) => {
        return prev +=
            `
            <table class="cart-table" product-id="${curr.productId}">
                <tr>
                    <td class="cart-cell cell-check">
                        <label class="cart-label">
                            <input type="checkbox" class="cart-select" ${curr.productChecked? 'checked' : ''}>
                        </label>
                    </td>
                    <td class="cart-cell cell-info">
                        <div class="cart-list-info-wrap">
                            <img src="${data.imageHost+curr.productMainImage}" alt="${curr.ProductName}" class="p-img">
                            <a href="./detail.html?productId=${curr.productId}" class="link">
                                ${curr.productSubtitle}
                            </a>
                        </div>
                    </td>
                    <td class="cart-cell cell-price">$${curr.productPrice}</td>
                    <td class="cart-cell cell-count">
                        <span class="count-btn plus">+</span>
                        <input class="count-input" value="${curr.quantity}">
                        <span class="count-btn minus">-</span>
                    </td>
                    <td class="cart-cell cell-total">$${curr.productTotalPrice}</td>
                    <td class="cart-cell cell-operation">
                        <span class="link cart-delete">&#x1f5d1</span>
                    </td>
                </tr>
            </table>
            `
    },'');


    return(`
        <div class="cart-header">
            <table class="cart-table">
                <tr>
                    <th class="cart-cell cell-check">
                        <label class="cart-label">
                            <input type="checkbox" class="cart-select-all" ${data.allChecked? 'checked' : ''}>
                            <span>Select All</span>
                        </label>
                    </th>
                    <th class="cart-cell cell-info">Product Info</th>
                    <th class="cart-cell cell-price">Price</th>
                    <th class="cart-cell cell-count">Amount</th>
                    <th class="cart-cell cell-total">Total</th>
                    <th class="cart-cell cell-operation">Operation</th>
                </tr>
            </table>
        </div>
        <div class="cart-list">
            ${cartList}
        </div>
        <div class="cart-footer">
            <div class="select-con">
                <label class="cart-label">
                    <input type="checkbox" class="cart-select-all" ${data.allChecked? "checked" : ""}>
                    <span>Select All</span>
                </label>
            </div>
            <div class="delete-con">
                <span class="link">Delete</span>
            </div>
            <div class="submit-con">
                <span>Total:</span>
                <span class="submit-total">$${data.cartTotalPrice}</span>
                <span class="btn btn-submit">Checkout</span>
            </div>
        </div>
    `)
}



let loader = "<div class=\"loading\"><div class=\"lds-ring\"><div></div><div></div><div></div><div></div></div></div>";
let page = {
    data:{
        cartInfo: ''
    },
    init: function () {
        this.onLoad();
    },
    onLoad: function () {

        nav.init();
        this.loadCart();
    },
    bindEvent: function(){
        //bind event to select checkbox
        let productCheckboxes = document.getElementsByClassName('cart-select');
        let selectAllCheckboxes = document.getElementsByClassName('cart-select-all');
        Array.from(selectAllCheckboxes).forEach((element) =>
            element.addEventListener('click',() => {
                if(this.data.cartInfo.allChecked){
                    _cart.unselectAll((res) => {
                        this.loadCart(res.cartProductVoList);
                    },(msg) => {_mm.errorTips("Something went wrong, please try again")})
                }else{
                    _cart.selectAll((res) => {
                        this.loadCart(res.cartProductVoList);
                    },(msg) => {_mm.errorTips("Something went wrong, please try again")})
                }
            })
        );
        Array.from(productCheckboxes).forEach((element) =>
            element.addEventListener('click',() => {
                let productId = element.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('product-id');
                let checked = Array.from(this.data.cartInfo.cartProductVoList).find((element) => {
                    if(parseInt(element.productId) === parseInt(productId) && parseInt(element.productChecked) === 1){
                        return true;
                    }
                    return false;
                });
                if(checked){
                    _cart.unselectProduct(productId,(res) => {
                        this.loadCart(res.cartProductVoList);
                    },(msg) => {_mm.errorTips("Something went wrong, please try again")})
                }else{
                    _cart.selectProduct(productId,(res) => {
                        this.loadCart(res.cartProductVoList);
                    },(msg) => {_mm.errorTips("Something went wrong, please try again")})
                }
            })
        );
        //bind event to amount buttons
        let amountChangeContainers = document.getElementsByClassName('cart-cell cell-count');
        Array.from(amountChangeContainers).forEach((element) => {
            let plusBtn = element.getElementsByClassName('plus')[0];
            let minusBtn = element.getElementsByClassName('minus')[0];
            if(!plusBtn || !minusBtn){
                return;
            }
            let productId = element.parentNode.parentNode.parentNode.getAttribute('product-id');
            let productInfo = this.data.cartInfo.cartProductVoList.find(element => {
                if(parseInt(element.productId) === parseInt(productId)){
                    return true;
                }
                return false;
            });
            let maxCount = productInfo.productStock;
            let minCount = 1;
            let currAmount = productInfo.quantity;
            plusBtn.addEventListener('click',() => {
                if(currAmount >= maxCount || currAmount < minCount) {
                    return;
                }
                _cart.changeProductAmount({productId,count: currAmount + 1},(res) => {
                    this.loadCart(res.cartProductVoList);
                    nav.init();
                },(msg) => {_mm.errorTips("Something went wrong, please try again")})
            });
            minusBtn.addEventListener('click',() => {
                if(currAmount <= minCount || currAmount > maxCount) {
                    return;
                }
                _cart.changeProductAmount({productId,count: currAmount - 1},(res) => {
                    this.loadCart(res.cartProductVoList);
                    nav.init();
                },(msg) => {_mm.errorTips("Something went wrong, please try again")})
            });
        });
        //bind event for delete btn
        let deleteBtns = document.getElementsByClassName('cart-delete');
        Array.from(deleteBtns).forEach(element => {
            element.addEventListener('click',() => {
                let productId = element.parentNode.parentNode.parentNode.parentNode.getAttribute('product-id');
                if(window.confirm('Do you really want to delete this item?')){
                    _cart.deleteProduct(productId,(res) => {
                        this.loadCart(res.cartProductVoList);
                        nav.init();
                    },(msg) => {_mm.errorTips("Something went wrong, please try again")})
                }
            })
        });
        //bind event for delete selected btn
        let deleteSelectedBtn = document.getElementsByClassName('delete-con')[0];
        deleteSelectedBtn.addEventListener('click',() => {
            if(window.confirm('Do you really want to delete these items?')){
                let deleteItems = [];
                Array.from(this.data.cartInfo.cartProductVoList).forEach(element => {
                    if(parseInt(element.productChecked) === 1){
                        parseInt(deleteItems.push(element.productId));
                    }
                });
                deleteItems = deleteItems.join(',');
                _cart.deleteProduct(deleteItems,(res) => {
                    this.loadCart(res.cartProductVoList);
                    nav.init();
                },(msg) => {_mm.errorTips("Something went wrong, please try again")})
            }
        });
        //bind event for checkout page
        let checkoutBtn = document.getElementsByClassName('btn-submit')[0];
        checkoutBtn.addEventListener('click',() => {
            window.location.href = './order-confirm.html'
        });

    },
    loadCart: function () {
        document.getElementsByClassName('page-wrap')[0].innerHTML = loader;
        _cart.getCartList((res) => {

            this.data.cartInfo = res;
            document.getElementsByClassName('page-wrap')[0].innerHTML = renderHTML(res);
            if(!res.cartProductVoList.length <= 0){
                this.bindEvent();
            }
        },(err) => {
            if(err === 10){
                window.location.href = './user-login.html?redirect='+window.location.href;
            }
            document.getElementsByClassName('page-wrap')[0].innerHTML =
                '<p class=\"error-tips\">Something is wrong, try refreshing the page</p>';
        })
    }
};

window.onload = () => page.init();