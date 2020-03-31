import _mm from '../util/mm';
import axios from 'axios';
import qs from 'qs';

let _cart = {
    //get number of items in cart from server
    getCartCount: function (resolve, reject) {
        axios.get('/cart/get_cart_product_count.do')
            .then((msg) => {
                console.log(msg);
                if(msg.data.status !== 0){
                    reject(msg.data.msg);
                }
                else {
                    resolve(msg.data.data);
                }
            },(a) => reject(a.response.statusText));
    },
    addToCart: function (productInfo,resolve,reject) {
        console.log(_mm.getServerUrl('/cart/add.do?' + qs.stringify(productInfo)));
        axios.get(_mm.getServerUrl('/cart/add.do?' + qs.stringify(productInfo)))
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
    getCartList: function (resolve,reject) {
        axios.get(_mm.getServerUrl('/cart/list.do?' ))
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
    selectAll: function (resolve,reject) {
        axios.get(_mm.getServerUrl('/cart/select_all.do?' ))
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
    unselectAll: function (resolve,reject) {
        axios.get(_mm.getServerUrl('/cart/un_select_all.do?' ))
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
    selectProduct: function (productId,resolve,reject) {
        axios.get(_mm.getServerUrl('/cart/select.do?productId=' )+productId)
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
    unselectProduct: function (productId,resolve,reject) {
        axios.get(_mm.getServerUrl('/cart/un_select.do?productId=' )+productId)
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
    deleteProduct: function (productIds,resolve,reject) {
        axios.get(_mm.getServerUrl('/cart/delete_product.do?productIds=' )+productIds)
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
    changeProductAmount: function (changeInfo,resolve,reject) {
        axios.get(_mm.getServerUrl('/cart/update.do?' )+qs.stringify(changeInfo))
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
};

export default _cart;