import './index.css';

let page = {
    data: {
        childComponent: null,
    },
    init: function (data) {
        this.data.container = document.getElementsByClassName('modal-wrap')[0];
        this.data.onUpdateHide = data.onUpdateHide;
        this.bindEvent();
        // this.data.childComponent.init();
    },
    bindEvent: function () {
        document.body.addEventListener('click',(event) => {
            if(this.data.container.classList.contains('hide')){
                return;
            }
            if(event.target === this.data.container){
                this.hide();
            }
            if(event.target === this.data.container.getElementsByClassName('close')[0]){
                this.hide();
            }
        })
    },
    show: function (data) {
        this.data.container.getElementsByClassName('modal-title')[0].textContent = data.title;
        this.data.container.classList.remove('hide');
    },
    hide: function () {
        this.data.container.classList.add('hide');
    },
    updateHide: function () {
        this.data.onUpdateHide();
        this.data.container.classList.add('hide');
    }

};

export default page;