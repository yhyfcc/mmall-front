import './index.css';
import _mm from '../../../util/mm';


let header = {
    init: function () {
        this.bindEvent();
        this.onload();
    },
    onload: function () {
        let keyword = _mm.getUrlParam('keyword');
        //If there is a valid keyword in URL, put it into input box
        if(keyword){
            document.getElementById('search-input').textContent = 'keyword';
        }
    },
    bindEvent: function () {
        document.getElementById('search-btn').addEventListener('click',() => {
            this.searchSubmit();
        });
        document.getElementById('search-input').addEventListener('keyup',(event) => {
            if(event.key === 'Enter'){
                this.searchSubmit();
            }
        })
    },
    //Submit search keyword
    searchSubmit: function () {
        let keyword = document.getElementById('search-input').value.trim();
        //If keyword is valid, jump to page containing item list
        if(keyword){
            window.location.href = './list.html?keyword=' + keyword;
        }else{
            _mm.goHome();
        }
    }
};

header.init();