import '../common/nav/index.css';
import '../common/header/index.css';
import './index.css';
import _mm from '../../util/mm';
import _order from '../../sevice/order-service';
import navSide from "../common/nav-side/index";
import nav from '../common/nav/index';
import Pagination from '../../util/pagination/index';

function renderTemplate(data){
    let orders = Array.from(data.list).reduce((prev,order) => {
        let items = Array.from(order.orderItemVoList).reduce((prev,item) => {
            return prev + `
                    <tr class="">
                            <td class="cell cell-img">
                                <a href="./detail.html?productId=${item.productId}" target="_blank">
                                    <img class="p-img" 
                                    src="${order.imageHost+item.productImage}" alt="${item.productName}">
                                </a>
                            </td>
                            <td class="cell cell-info">
                                <a href="./detail.html?productId=${item.productId}" target="_blank" class="link">
                                    ${item.productName}
                                </a>
                            </td>
                            <td class="cell cell-price">$${item.currentUnitPrice}</td>
                            <td class="cell cell-count">${item.quantity}</td>
                            <td class="cell cel-total">$${item.totalPrice}</td>
                    </tr>
            `
        },'');
        return prev + `
                <table class="order-list-table order-item">
                    <tr>
                        <td colspan="5" class="order-info">
                            <span class="order-text">
                                <span>Order ID:</span>
                                <a href="./order-detail.html?orderNumber=${order.orderNo}" class="link order-num">${order.orderNo}</a>
                            </span>
                            <span class="order-text">${order.createTime}</span>
                            <span class="order-text">${order.receiverName}</span>
                            <span class="order-text">Status: ${order.statusDesc}</span>
                            <span class="order-text">
                                <span>Order total: </span>
                                <span class="order-total">$${order.payment}</span>
                            </span>
                            <a href="./order-detail.html?orderNumber=${order.orderNo}" class="link order-detail">Detail</a>
                        </td>
                    </tr>
                    ${items}
                </table>  
        `
    },'');
    return `
                    <table class="order-list-table header">
                        <tr>
                            <th class="cell cell-img">&nbsp;</th>
                            <th class="cell cell-info">Description</th>
                            <th class="cell cell-price">Price</th>
                            <th class="cell cell-count">Amount</th>
                            <th class="cell cel-total">Total</th>
                        </tr>
                    </table>
                    ${orders}
    `
}

let page = {
    data: {
        listParam: {
            pageNum: 1,
            pageSize: 1
        }
    },
    init: function () {
        navSide.init({
            name: 'order-list'
        });
        nav.init();
        this.loadOrderList();
    },
    loadOrderList: function () {
        _order.getOrderList(this.data.listParam,(res) => {
            this.dataFilter(res);
            if(res.isEmpty){
                document.getElementsByClassName('order-list-con')[0].innerHTML = '';
            }else {
                document.getElementsByClassName('order-list-con')[0].innerHTML = renderTemplate(res);
                this.loadPages({
                    hasPreviousPage: res.hasPreviousPage,
                    prePage: res.prePage,
                    hasNextPage: res.hasNextPage,
                    nextPage: res.nextPage,
                    pageNum: res.pageNum,
                    pages: res.pages
                })
            }
        },(rej) => {document.getElementsByClassName('order-list-con')[0].innerHTML =
        '<p class="error-tips">Failed to load order list, please try again later</p>'})
    },
    dataFilter: function (data) {
        data.isEmpty = !data.list.length;
    },
    loadPages: function (pageInfo) {
        this.pagination = this.pagination ? this.pagination :
            new Pagination(document.getElementsByClassName('pages')[0],{
                prevEvent: () => {this.data.listParam.pageNum -= 1;this.loadOrderList()},
                nextEvent: () => {this.data.listParam.pageNum += 1;this.loadOrderList()},
                selectEvent: (pageNum) => {this.data.listParam.pageNum = pageNum;this.loadOrderList()},
            });
        this.pagination.render(pageInfo);
    }

};

window.addEventListener('load',() => page.init());