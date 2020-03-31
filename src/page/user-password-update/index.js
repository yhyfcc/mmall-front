import '../common/nav/index.css';
import '../common/header/index.css';
import './index.css';
import _mm from '../../util/mm';
import _user from '../../sevice/user-service';
import navSide from "../common/nav-side/index";
import nav from '../common/nav/index';


let page = {
    init: function () {
        navSide.init({
            name: 'user-password-update'
        });
        nav.init();
        this.bindEvent();
    },
    bindEvent: function(){
        let submitBtn = document.getElementsByClassName("btn btn-submit")[0];
        submitBtn.onclick = () => this.submit();
    },
    submit: function(){
        let formData = {
            passwordOld: document.getElementById('password').value,
            passwordNew: document.getElementById('new-password').value,
            passwordNewConfirm: document.getElementById('new-password-confirm').value
        };
        let validationResult = this.formValidate(formData);
        if(validationResult.status){
            _user.updatePassword(formData,(res,msg) => {
                _mm.successTips(msg);
                window.location.href = './user-center.html';
            },(err) => {_mm.errorTips(err)});
        }else{
            _mm.errorTips(validationResult.msg)
        }
    },
    formValidate: function(formData){
        let result = {
            status: false,
            msg: ""
        };
        if(!_mm.validate(formData.passwordOld,'require')){
            result.msg = "Old password can't be empty";
            return result;
        }
        if(!_mm.validate(formData.passwordNew,'require')){
            result.msg = "New Password can't be empty";
            return result;
        }
        if((!formData.passwordNew) || formData.passwordNew.length < 6 ){
            result.msg = "Password should have at least 6 digits";
            return result;
        }
        if(formData.passwordNew !== formData.passwordNewConfirm){
            result.msg = "Passwords you input are not identical";
            return result;
        }
        result.status = true;
        return result;
    }
};

window.addEventListener('load',() => page.init());