import './index.css'
import _mm from '../../../util/mm'


let navSide = {
    option: {
        name : '',
        navList : [
            {name: 'user-center',desc: 'Account Management', href: './user-center.html'},
            {name: 'order-list',desc: 'My Order', href: './order-list.html'},
            {name: 'user-password-update',desc: 'Change Password', href: './user-password-update.html'},
            {name: 'about',desc: 'About MMall', href: './about.html'}
        ]
    },
    init : function (option) {
        //merge options
        this.option = {...this.option,...option};
        this.renderNav();
    },
    renderNav : function () {
        //find active element
        this.option.navList.forEach(element => {
            if(element.name === this.option.name){
                element.isActive = true;
            }
        });
        //render list
        let navItems = this.option.navList.reduce((prev,curr) => {
            return prev + `<li class="nav-item ">
<a class="link ${curr.isActive?'active':''}" href=${curr.href}>${curr.desc}</a></li>`
        },"");
        document.getElementsByClassName('nav-side')[0].innerHTML = navItems;
    }
};

export default navSide;