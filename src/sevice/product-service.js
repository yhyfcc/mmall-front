import _mm from '../util/mm'
import axios from 'axios'
import qs from 'qs'

let _product = {
    //Get product list
    getProductList: function(listParam,resolve, reject){
        axios.get(_mm.getServerUrl('/product/list.do?' + qs.stringify(listParam)))
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
    getProductDetail: function (productId,resolve,reject) {
        axios.get(_mm.getServerUrl('/product/detail.do?productId=' + productId))
            .then((msg) => {
                console.log(msg);
                if(msg.data.status !== 0){
                    reject(msg.data.msg);
                }
                else {
                    resolve(msg.data.data);
                }
            },(a) => reject(a.response.statusText));
    }
};

export default _product;