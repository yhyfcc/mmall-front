import '../common/header/index';
import '../common/nav/index';
import nav from '../common/nav/index';
import _mm from '../../util/mm';
import _product from '../../sevice/product-service';
import _cart from '../../sevice/cart-service';
import './index.css';
import Pagination from "../../util/pagination";

function renderHTML(data){
    let subImages = data.subImages.reduce((prev,curr) => {
        return prev + `<li class="p-img-item"><img class="p-img" 
                    src="${data.imageHost+curr}" alt="${data.name}"></li>`
    },'');
    return (
    `
        <div class="intro-wrap">
            <div class="p-img-con">
                <div class="main-img-con">
                    <img class="main-img" src="${data.imageHost+data.mainImage}" alt="${data.name}">
                </div>
                <ul class="p-img-list">
                    ${subImages}
                </ul>
            </div>
            <div class="p-info-con">
                <h1 class="p-name">${data.name}</h1>
                <p class="p-subtitle">${data.subtitle}</p>
                <div class="p-info-item p-price-con">
                    <span class="label">Price</span>
                    <span class="info">$${data.price}</span>
                </div>
                <div class="p-info-item">
                    <span class="label">Stock</span>
                    <span class="info">${data.stock}</span>
                </div>
                <div class="p-info-item p-count-con">
                    <span class="label">Amount</span>
                    <input value="1" class="p-count" readonly>
                    <span class="p-count-btn plus">+</span>
                    <span class="p-count-btn minus">-</span>
                </div>
                <div class="p-info-item">
                    <a href="#" class="btn cart-add" ${data.stock===0?'disabled':''}>Add to cart</a>
                </div>
            </div>
        </div>
        <div class="detail-wrap">
            <div class="detail-tap-con">
                <ul class="tab-list">
                    <li class="tab-item active">Detail</li>
                </ul>
            </div>
            <div class="detail-con">
                ${data.detail}
            </div>
        </div>
        <div class="detail-wrap">
    
        </div>
        `
    )
}
let loader = "<div class=\"loading\"><div class=\"lds-ring\"><div></div><div></div><div></div><div></div></div></div>";
let page = {
    data:{
        productId : _mm.getUrlParam('productId') || ''
    },
    init: function () {
        this.onLoad();
    },
    onLoad: function () {
        if(!this.data.productId){
            _mm.goHome();
        }
        nav.init();
        this.loadDetail();
    },
    bindEvent: function(){
        Array.from(document.getElementsByClassName('p-img')).forEach(element => {
            element.addEventListener('mouseenter', () => {
                document.getElementsByClassName('main-img')[0].src = element.src;
            })
        });
        Array.from(document.getElementsByClassName('p-count-btn')).forEach(ele => {
            if(ele.nodeType !== 1){
                return;
            }
            ele.addEventListener('click',() => {
                let type = ele.classList.contains('plus')? 'plus': 'minus';
                let inputBox = document.getElementsByClassName('p-count')[0];
                let currCount = parseInt(inputBox.value);
                let minCount = 1;
                let maxCount = this.data.detailInfo.stock || 1;
                if(type === 'plus'){
                    inputBox.value = currCount < maxCount ? currCount + 1 : maxCount
                }else if (type === 'minus'){
                    inputBox.value = currCount > minCount ? currCount - 1 : minCount
                }
            })
        });
        document.getElementsByClassName('cart-add')[0].addEventListener('click',() => {
            _cart.addToCart({
                productId : this.data.productId,
                count: document.getElementsByClassName('p-count')[0].value
            },(res) => {
                window.location.href = './result.html?type=cart-add';
            },(msg) => {
                if(msg === 10){
                    window.location.href = './user-login.html?redirect=' + window.location.href;
                }else {
                    _mm.errorTips(msg)
                }
            });
        })
    },
    loadDetail: function () {
        document.getElementsByClassName('page-wrap')[0].innerHTML = loader;
        _product.getProductDetail(this.data.productId,(res) => {
            this.data.detailInfo = res;
            res.subImages = res.subImages.split(',');
            console.log(res.subImages);
            document.getElementsByClassName('page-wrap')[0].innerHTML = renderHTML(res);
            this.bindEvent();
        },(msg) => {document.getElementsByClassName('page-wrap')[0].innerHTML =
            '<div class="error-tips">Can\'t find the product you are visiting</div>'})
    }    
};

window.onload = () => page.init();