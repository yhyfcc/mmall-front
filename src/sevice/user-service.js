import _mm from '../util/mm'
import axios from 'axios'
import qs from 'qs'

let _user = {
    //Login user
    login: function(userInfo,resolve, reject){
        console.log(userInfo);
        axios.post(_mm.getServerUrl('/user/login.do'),qs.stringify(userInfo))
            .then((msg) => {
                console.log(msg);
                if(msg.data.status === 1){
                    reject(msg.data.msg);
                }
                else {
                    resolve();
                }
            },(a) => reject(a.response.statusText));
    },
    //check if user if logged in
    checkLogin: function(resolve, reject){
        axios.post(_mm.getServerUrl('/user/get_user_info.do'))
            .then((msg) => {
                console.log(msg);
                if(msg.data.status === 1){
                    reject(msg.data.msg);
                }
                else {
                    resolve(msg.data.data);
            }
        },(a) => reject(a.response.statusText));
    },
    //get password reset question for an username
    getQuestion: function(username,resolve,reject){
        axios.post(_mm.getServerUrl('/user/forget_get_question.do'),qs.stringify({username}))
            .then((msg) => {
                console.log(msg);
                if(msg.data.status === 1){
                    reject(msg.data.msg);
                }
                else {
                    resolve(msg.data.data);
                }
            },(a) => reject(a.response.statusText));
    },
    //check if answer is correct for a password reset question
    checkAnswer: function(userInfo,resolve,reject){
        axios.post(_mm.getServerUrl('/user/forget_check_answer.do'),qs.stringify(userInfo))
            .then((msg) => {
                console.log(msg);
                if(msg.data.status === 1){
                    reject(msg.data.msg);
                }
                else {
                    resolve(msg.data.data);
                }
            },(a) => reject(a.response.statusText));
    },
    //send new password to server
    resetPassword: function(userInfo,resolve,reject){
        axios.post(_mm.getServerUrl('/user/forget_reset_password.do'),qs.stringify(userInfo))
            .then((msg) => {
                console.log(msg);
                if(msg.data.status === 1){
                    reject(msg.data.msg);
                }
                else {
                    resolve();
                }
            },(a) => reject(a.response.statusText));
    },
    //get userInfo for a signed in user
    getUserInfo: function(resolve,reject){
        axios.post(_mm.getServerUrl('/user/get_information.do'))
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
    //update userInfo
    updateUserInfo: function(userInfo,resolve,reject){
        axios.post(_mm.getServerUrl('/user/update_information.do'),qs.stringify(userInfo))
            .then((msg) => {
                console.log(msg);
                if(msg.data.status !== 0){
                    reject(msg.data.msg);
                }
                else {
                    resolve(msg.data.data,msg.data.msg);
                }
            },(a) => reject(a.response.statusText));
    },
    //update password when logged in
    updatePassword: function(userInfo,resolve,reject){
        axios.post(_mm.getServerUrl('/user/reset_password.do'),qs.stringify(userInfo))
            .then((msg) => {
                console.log(msg);
                if(msg.data.status !== 0){
                    reject(msg.data.msg);
                }
                else {
                    resolve(msg.data.data,msg.data.msg);
                }
            },(a) => reject(a.response.statusText));
    },
    //send logout request to server
    logout : function (resolve, reject) {
        axios.post(_mm.getServerUrl('/user/logout.do'))
            .then((msg) => {
                console.log(msg);
                if(msg.data.status === 1){
                    reject(msg.data.msg);
                }
                else {
                    resolve();
                }
            },(a) => reject(a.response.statusText));
    },
    //check if username is already taken
    checkUsername : function (username,resolve, reject) {
        axios.post(_mm.getServerUrl(`/user/check_valid.do?str=${username}&type=username`))
            .then((msg) => {
                if(msg.data.status === 1){
                    reject(msg.data.msg);
                }
                else{
                    resolve();
                }
            },(a) => reject(a.response.statusText));
    },
    //resister an user
    register : function (userInfo,resolve, reject) {
        axios.post(_mm.getServerUrl('/user/register.do'),userInfo)
            .then((msg) => {
                console.log(msg);
                if(msg.data.status === 1){
                    reject(msg.message);
                }
                else{
                    resolve();
                }
            },(a) => reject(a.response.statusText));
    },
};

export default _user;