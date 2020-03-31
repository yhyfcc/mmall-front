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
        ))
    },
    //Submit form
    submit: function () {
        let formData = {
            username: document.getElementById("username").value.trim(),
            password: document.getElementById("password").value.trim()
        };
        let validationResult = this.formValidate(formData);
        if(validationResult.status){
            _user.login(formData,
                (msg) => window.location.href = _mm.getUrlParam('redirect') || './index.html',
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
        }
        if(!_mm.validate(formData.password, 'require')){
            result.msg = "Password can't be empty";
            return result;
        }
        result.status = true;
        return result;
    }
};

window.addEventListener('load',() => page.init());