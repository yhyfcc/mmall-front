import _mm from '../util/mm';
import axios from 'axios';
import qs from 'qs';

let _address = {
    //get number of items in cart from server
    getAddressList: function (resolve, reject) {
        axios.get('/shipping/list.do')
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
    createAddress: function (data,resolve, reject) {
        axios.get('/shipping/add.do?' + qs.stringify(data))
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
    deleteAddress: function (data,resolve,reject) {
        axios.get('/shipping/del.do?shippingId=' + data)
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
    getAddress: function (data,resolve,reject) {
        axios.get('/shipping/select.do?shippingId=' + data)
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
    updateAddress: function (data,resolve,reject) {
        axios.get('/shipping/update.do?' + qs.stringify(data))
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

export default _address;