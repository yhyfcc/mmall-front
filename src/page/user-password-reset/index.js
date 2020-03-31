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
    data: {
        username: "",
        question: "",
        answer: "",
        token: ""
    },
    init: function () {
        formError.hide();
        this.bindEvent();
    },
    bindEvent: function () {
        document.getElementById("submit-username").onclick = () => this.submitUsername();
        document.getElementById("submit-question").onclick = () => this.submitAnswer();
        document.getElementById("submit-password").onclick = () => this.submitPassword();
        Array.from(document.getElementsByClassName("user-input")).forEach(
            element => element.addEventListener(
                "keyup", (e) => {if(e.key === "Enter") this.submit()}
            ))
    },
    //Submit username and start next step
    submitUsername: function () {
        let username = document.getElementById("username").value.trim();
        if(username){
            _user.getQuestion(username, (question) => {
                this.data.username = username;
                this.data.question = question;
                this.loadStepQuestion();
            },err => formError.show(err));
        }else{
            formError.show("Please input your username")
        }
    },
    //Submit answer to password reset question
    submitAnswer: function() {
        let answer = document.getElementById("answer").value.trim();
        if(answer){
            _user.checkAnswer({username: this.data.username,question: this.data.question,answer}, (token) => {
                this.data.answer = answer;
                this.data.token = token;
                this.loadStepPassword();
            },err => formError.show(err));
        }else{
            formError.show("Please input the answer to password reset question")
        }
    },
    //Submit new password
    submitPassword: function() {
        let password = document.getElementById("password").value.trim();
        if(password && password.length >= 6){
            _user.resetPassword({
                username: this.data.username,
                passwordNew: password,
                forgetToken: this.data.token
            }, () => {
                window.location.href = './result.html?type=password-reset';
            },err => formError.show(err));
        }else{
            formError.show("Please input new password with 6 or more digits");
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
    },
    //Show second step of password reset, input answer to reset question
    loadStepQuestion: function () {
        formError.hide();
        document.getElementsByClassName("step-username")[0].classList.add("hide");
        let stepQuestion = document.getElementsByClassName("step-question")[0];
        stepQuestion.classList.remove("hide");
        stepQuestion.getElementsByClassName("question")[0].textContent = this.data.question;
    },
    //Show third step of password reset, input new password
    loadStepPassword: function () {
        formError.hide();
        document.getElementsByClassName("step-question")[0].classList.add("hide");
        document.getElementsByClassName("step-password")[0].classList.remove("hide");
    }
};

window.addEventListener('load',() => page.init())