import '../common/nav/index.css';
import '../common/header/index.css';
import './index.css';
import _mm from '../../util/mm';
import _user from '../../sevice/user-service';
import navSide from "../common/nav-side/index";
import nav from '../common/nav/index';

function renderTempleate(data){
    return `<div class="user-info">
                        <div class="form-line">
                            <span class="label">Username:</span>
                            <span class="text">${data.username}</span>
                        </div>
                        <div class="form-line">
                            <span class="label">Tel:</span>
                            <input type="text" id="phone" autocomplete="off" value=${data.phone}> 
                        </div>
                        <div class="form-line">
                            <span class="label">Email:</span>
                            <input type="text" id="email" autocomplete="off" value=${data.email}> 
                        </div>
                        <div class="form-line">
                            <span class="label">Question:</span>
                            <input type="text" id="question" autocomplete="off" value=${data.question}> 
                        </div>
                        <div class="form-line">
                            <span class="label">Answer:</span>
                            <input type="text" id="answer" autocomplete="off" value=${data.answer}> 
                        </div>
                        <span class="btn btn-submit">Submit change</span>
                    </div>`
}

let page = {
    init: function () {
        navSide.init({
            name: 'user-center'
        });
        nav.init();
        this.loadUserInfo();
    },
    bindEvent: function(){
        let submitBtn = document.getElementsByClassName("btn btn-submit")[0];
        submitBtn.onclick = () => this.submit();
    },
    submit: function(){
        let formData = {
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            question: document.getElementById('question').value,
            answer: document.getElementById('answer').value
        };
        let validationResult = this.formValidate(formData);
        if(validationResult.status){
            _user.updateUserInfo(formData,(res,msg) => {
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
        if(!_mm.validate(formData.phone, 'phone')){
            result.msg = "Please input a valid phone number";
            return result;
        }
        if(!_mm.validate(formData.question, 'require')){
            result.msg = "Password reset question can't be empty";
            return result;
        }
        if(!_mm.validate(formData.answer, 'require')){
            result.msg = "Answer to password reset question can't be empty";
            return result;
        }
        if(!_mm.validate(formData.email, 'email')){
            result.msg = "Please input a valid email address";
            return result;
        }
        result.status = true;
        return result;
    },
    loadUserInfo: function () {
        _user.getUserInfo((msg) => {
            let userInfoHTML = renderTempleate(msg);
            let panelBody = document.getElementsByClassName("panel-body")[0];
            panelBody.innerHTML = userInfoHTML;
            this.bindEvent();
        },(error) => document.getElementsByClassName("panel-body")[0].innerHTML = error)
    }
};

window.addEventListener('load',() => page.init());