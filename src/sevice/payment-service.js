import axios from "axios";
import _mm from "../util/mm";

let _payment = {
    getPaymentInfo: function (orderNumber,resolve,reject) {
        axios.get(_mm.getServerUrl('/order/pay.do?orderNo=' + orderNumber))
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
    getPaymentStatus: function (orderNumber,resolve,reject) {
        axios.get(_mm.getServerUrl('/order/query_order_pay_status.do?orderNo=' + orderNumber))
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

export default _payment;
