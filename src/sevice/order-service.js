import _mm from '../util/mm';
import axios from 'axios';
import qs from 'qs';

let _order = {
    //get list of products in the order confirm page
    getOrderProductList: function (resolve, reject) {
        axios.get('/order/get_order_cart_product.do')
            .then((msg) => {
                console.log(msg);
                if(msg.data.status === 10){
                    reject(msg.data.status)
                }else if(msg.data.status !== 0){
                    reject(msg.data.msg);
                }
                else {
                    resolve(msg.data.data);
                }
            },(a) => reject(a.response.statusText));
    },
    createOrder: function (orderInfo,resolve, reject) {

        axios.get('/order/create.do?'+ qs.stringify(orderInfo))
            .then((msg) => {
                console.log(msg);
                if(msg.data.status === 10){
                    reject(msg.data.status)
                }else if(msg.data.status !== 0){
                    reject(msg.data.msg);
                }
                else {
                    resolve(msg.data.data);
                }
            },(a) => reject(a.response.statusText));
    },
    getOrderList: function (orderInfo,resolve, reject) {
        axios.get('/order/list.do?'+qs.stringify(orderInfo))
            .then((msg) => {
                console.log(msg);
                if(msg.data.status === 10){
                    reject(msg.data.status)
                }else if(msg.data.status !== 0){
                    reject(msg.data.msg);
                }
                else {
                    resolve(msg.data.data);
                }
            },(a) => reject(a.response.statusText));
    },
    getOrderDetail: function (orderNo,resolve, reject) {
        axios.get('/order/detail.do?orderNo='+orderNo)
            .then((msg) => {
                console.log(msg);
                if(msg.data.status === 10){
                    reject(msg.data.status)
                }else if(msg.data.status !== 0){
                    reject(msg.data.msg);
                }
                else {
                    resolve(msg.data.data);
                }
            },(a) => reject(a.response.statusText));
    },
    cancelOrder: function (orderNo,resolve, reject) {
        axios.get('/order/cancel.do?orderNo='+orderNo)
            .then((msg) => {
                console.log(msg);
                if(msg.data.status === 10){
                    reject(msg.data.status)
                }else if(msg.data.status !== 0){
                    reject(msg.data.msg);
                }
                else {
                    resolve(msg.data.data);
                }
            },(a) => reject(a.response.statusText));
    }
};

export default _order;