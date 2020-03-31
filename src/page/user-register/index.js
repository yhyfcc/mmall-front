import qs from 'qs';
import _mm from '../../util/mm';
import _user from '../../sevice/user-service';
import '../common/nav-simple/index';
import './index.css';


//Error message in form
let formError = {
    show: function (errMsg) {
        document.getElementsByClassName('error-item')[0].classList.remove('hide');
        document.getElementsByClassName('error-item')[0]
            .getElementsByClassName('error-message')[0].textContent = errMsg;
    },
    hide: function () {
        document.getElementsByClassName('error-item')[0]
            .getElementsByClassName('error-message')[0].textContent = '';
        document.getElementsByClassName('error-item')[0].classList.add('hide');
    }
};
let page = {
    init: function () {
        formError.hide();
        this.bindEvent();
    },
    bindEvent: function () {
        document.getElementById("submit").onclick = () => this.submit();
        Array.from(document.getElementsByClassName("user-input")).forEach(
            element => element.addEventListener(
                "keyup", (e) => {if(e.key === "Enter") this.submit()}
            ));
        let inputUsername = document.getElementById("username");
        inputUsername.onblur = () => {
            if(!inputUsername.value.trim()){
                return;
            };
            _user.checkUsername(inputUsername.value.trim(),(res) => formError.hide(),(err) => formError.show(err));
        }
    },
    //Submit form
    submit: function () {
        let formData = {
            username: document.getElementById("username").value.trim(),
            password: document.getElementById("password").value.trim(),
            passwordConfirm: document.getElementById("password-confirm").value.trim(),
            phone: document.getElementById("tel").value.trim(),
            email: document.getElementById("email").value.trim(),
            question: document.getElementById("password-reset-question").value.trim(),
            answer: document.getElementById("password-reset-answer").value.trim()
        };
        let validationResult = this.formValidate(formData);
        if(validationResult.status){
            _user.register(qs.stringify(formData),
                (msg) => window.location.href = './result.html?type=register',
                (err) => formError.show(err))
        }else{
            formError.show(validationResult.msg);
        }
    },
    //Validation of user input
    formValidate: function (formData) {
        let result = {
            status: false,
            msg: ""
        };
        if(!_mm.validate(formData.username, 'require')){
            result.msg = "Username can't be empty!";
            return result;
        };
        if(!_mm.validate(formData.password, 'require')){
            result.msg = "Password can't be empty";
            return result;
        };
        if(formData.password.length < 6){
            result.msg = "Password can't be shorter than 6 digits";
            return result;
        };
        if(formData.password !== formData.passwordConfirm){
            result.msg = "Two passwords are not identical";
            return result;
        };
        if(!_mm.validate(formData.phone, 'phone')){
            result.msg = "Please input a valid phone number";
            return result;
        };
        if(!_mm.validate(formData.email, 'email')){
            result.msg = "Please input a valid email address";
            return result;
        };
        if(!_mm.validate(formData.question, 'require')){
            result.msg = "Password reset question can't be empty";
            return result;
        };
        if(!_mm.validate(formData.question, 'require')){
            result.msg = "Answer to the question can't be empty";
            return result;
        };
        result.status = true;
        return result;
    }
};

window.addEventListener('load',() => page.init());