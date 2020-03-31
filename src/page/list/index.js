import '../common/header/index';
import '../common/nav/index';
import nav from '../common/nav/index';
import _mm from '../../util/mm';
import _product from '../../sevice/product-service';
import Pagination from '../../util/pagination/index';
import './index.css';

function renderHTML(data){
    if(data)
    return `<li class="p-item">
    <div class="p-img-con">
        <a href="./detail.html?productId=${data.id}" class="link">
            <img class="p-img" src="${data.imageHost + data.mainImage}" alt="${data.name}">
        </a>
    </div>
    <div class="p-price-con">
        <span class="p-price">$${data.price}</span>
    </div>
    <div class="p-name-con">
        <a href="./detail.html?productId=${data.id}" class="p-name">${data.name}</a>
    </div>
</li>`
}

let loader = "<div class=\"loading\"><div class=\"lds-ring\"><div></div><div></div><div></div><div></div></div></div>";
let page = {
    data:{
        listParam: {
            keyword: _mm.getUrlParam('keyword') || '',
            categoryId: _mm.getUrlParam('categoryId') || '',
            orderBy: _mm.getUrlParam('orderBy') || '',
            pageNum: _mm.getUrlParam('pageNum') || 1,
            pageSize: _mm.getUrlParam('pageSize') || 20
        }
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        nav.init();
        this.loadList();
    },
    bindEvent: function () {
        Array.from(document.getElementsByClassName('sort-item')).forEach((element) => {
            element.addEventListener('click',() => {
                this.data.listParam.pageNum = 1;
                if(element.getAttribute('data-type') === 'default'){
                    if(element.classList.contains('active')){
                        return;
                    }
                    this.data.listParam.orderBy = 'default';
                    element.classList.add('active');
                    Array.from(element.parentNode.children).forEach((sibling) => {
                        if(sibling.nodeType !== 1){
                            return;
                        }
                        if(sibling !== element){
                            sibling.classList.remove('active');
                            if(sibling.getAttribute('data-type') === 'price'){
                                Array.from(sibling.childNodes).forEach(
                                    ele => {
                                        if(ele.nodeType !== 1){
                                            return;
                                        }
                                        ele.classList.remove('active')
                                    });
                            }
                        }
                    });

                }else{
                    if(element.classList.contains('active')){
                        Array.from(element.childNodes).forEach(children => {
                            if(children.nodeType !== 1){
                                return;
                            }
                            if(children.classList.contains('active')){
                                children.classList.remove('active');
                            }else{
                                children.classList.add('active');
                                this.data.listParam.orderBy =
                                    children.classList.contains('sort-up') ? 'price_asc' : 'price_desc';
                            }
                        })
                    }else{
                        Array.from(element.parentNode.children).forEach((sibling) => {
                            if(sibling.nodeType !== 1){
                                return;
                            }
                            if(sibling !== element){
                                sibling.classList.remove('active');
                            }
                        });
                        element.classList.add('active');
                        element.getElementsByClassName('sort-up')[0].classList.add('active');
                        this.data.listParam.orderBy = 'price_asc';
                    }
                }
                this.loadList();
            });

        })
    },
    loadList: function () {
        if(this.data.listParam.categoryId){
            this.data.listParam.keyword = '';
        }
        if(this.data.listParam.keyword){
            this.data.listParam.categoryId = '';
        }
        document.getElementsByClassName("p-list-con")[0].innerHTML = loader;
        _product.getProductList(this.data.listParam, (res) => {
            if(res.list) {
                let listHTML = res.list.reduce((prev, curr) => {
                    return prev + renderHTML(curr);
                }, '');
                document.getElementsByClassName('p-list-con')[0].innerHTML = listHTML;
                this.loadPages({
                    hasPreviousPage: res.hasPreviousPage,
                    prePage: res.prePage,
                    hasNextPage: res.hasNextPage,
                    nextPage: res.nextPage,
                    pageNum: res.pageNum,
                    pages: res.pages
                })
            }else {
                document.getElementsByClassName('p-list-con')[0].innerHTML =
                    '<div class="error-tips">Can\'t find the product you are visiting</div>';
            }
        },(err) => {_mm.errorTips(err)})
    },
    loadPages: function (pageInfo) {
        this.pagination = this.pagination ? this.pagination :
            new Pagination(document.getElementsByClassName('pages')[0],{
                prevEvent: () => {this.data.listParam.pageNum -= 1;this.loadList()},
                nextEvent: () => {this.data.listParam.pageNum += 1;this.loadList()},
                selectEvent: (pageNum) => {this.data.listParam.pageNum = pageNum;this.loadList()},
            });
        this.pagination.render(pageInfo);
    }
};

window.onload = () => page.init();