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
                            <span class="text">${data.phone}</span>
                        </div>
                        <div class="form-line">
                            <span class="label">Email:</span>
                            <span class="text">${data.email}</span>
                        </div>
                        <div class="form-line">
                            <span class="label">Question:</span>
                            <span class="text">${data.question}</span>
                        </div>
                        <div class="form-line">
                            <span class="label">Answer:</span>
                            <span class="text">${data.answer}</span>
                        </div>
                        <a href="./user-center-update.html" class="btn btn-submit">Edit</a>
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
    loadUserInfo: function () {
        _user.getUserInfo((msg) => {
            let userInfoHTML = renderTempleate(msg);
            let panelBody = document.getElementsByClassName("panel-body")[0];
            panelBody.innerHTML = userInfoHTML;
        },(error) => document.getElementsByClassName("panel-body")[0].innerHTML = error)
    }
};

window.addEventListener('load',() => page.init());