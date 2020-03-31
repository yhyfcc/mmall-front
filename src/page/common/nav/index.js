import './index.css';
import _mm from '../../../util/mm';
import _user from '../../../sevice/user-service';
import _cart from '../../../sevice/cart-service';
let nav = {
    init : function(){
        this.bindEvent();
        this.loadCartCount();
        this.loadUserInfo();
        return this;
    },
    // bind events to links in nav bar
    bindEvent : function(){
        let loginButton = document.getElementsByClassName('js-login')[0];
        loginButton.addEventListener('click',() => {console.log("11");_mm.doLogin()});
        let signupButton = document.getElementsByClassName('js-signup')[0];
        signupButton.addEventListener('click',() => window.location.href = './register.html');
        let logoutButton = document.getElementsByClassName('js-signout')[0];
        logoutButton.addEventListener('click',
            () => _user.logout(res => window.location.reload(), err => _mm.errorTips(err)));
    },
    // load user info
    loadUserInfo : function(){
        _user.checkLogin(res => {
            let element = document.getElementsByClassName('user unauthenticated')[0];
            element.classList.add('hide');
            element.parentNode.childNodes.forEach(child => {
                if(child.nodeType !== 1){
                    return;
                }
                if(child !== element){
                    if(child.classList.contains('user') && child.classList.contains('authenticated')){
                        if(child.classList.contains('hide')) {
                            child.classList.remove('hide')
                        }
                        child.getElementsByClassName('username')[0].textContent = res.username
                    }
                }
            })
        }, err => {});
    },
    // load number of items in cart
    loadCartCount : function(){
        _cart.getCartCount(res => {
            document.getElementsByClassName('cart-count')[0].textContent = res || 0;
        }, err => {
            document.getElementsByClassName('cart-count')[0].textContent = 0;
        });
    }
};

export default nav;