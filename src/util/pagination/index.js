import './index.css';

function renderHTML(data,options) {
    let prevPage = data.hasPreviousPage? "<div class=\"prev-page page-btn\">Previous page</div>" :
        '<div class=\"prev-page page-btn\ disabled">Previous page</div>';
    let pageSelectors = "";
    let startPage = 1;
    if(data.pageNum + options.pageRange - 1 > data.pages ){
        startPage = Math.max(data.pageNum - (data.pageNum + options.pageRange - 1 - data.pages), 1);
    }else{
        startPage = data.pageNum;
    }
    for(let i = 0; i < data.pages && i < options.pageRange; i++){
        pageSelectors +=
            `<div class=\"page-selector page-btn 
            ${i+startPage === data.pageNum? 'page-curr' : ''} \">${i+startPage}</div>`
    }
    let nextPage = data.hasNextPage? "<div class=\"next-page page-btn\">Next page</div>" :
        '<div class=\"next-page page-btn disabled\">Next page</div>';
    let pageSummary =
                `<span class="current-page">${data.pageNum}</span>
                 <span class="separate">/</span>
                 <span class="total-page">${data.pages}</span>`
    return (
        `<div class="pagination-wrap">
            ${prevPage}
            <div class="page-selectors">
                ${pageSelectors}
            </div>
            ${nextPage}
            <div class="page-summary">
               ${pageSummary}
            </div>
        </div>`
    )
}

let defaultOption = {
    pageRange: 3,
    prevEvent: function () {},
    nextEvent: function () {},
    selectEvent: function () {},
};

class Pagination {
    constructor(target, options){
        this.target = target;
        this.options = {...defaultOption,...options};
    };
    render(pageInfo){
        if(pageInfo.pages <= 1){
            return;
        }
        this.target.innerHTML = renderHTML(pageInfo,this.options);
        this.bindEvents();
    };
    bindEvents(){
        if(!this.target.getElementsByClassName('prev-page')[0].classList.contains('disabled')){
            this.target.getElementsByClassName('prev-page')[0]
                .addEventListener('click',() => {console.log(this);this.options.prevEvent()});
        }
        if(!this.target.getElementsByClassName('next-page')[0].classList.contains('disabled')){
            this.target.getElementsByClassName('next-page')[0]
                .addEventListener('click',() => {console.log(this);this.options.nextEvent()});
        }
        Array.from(this.target.getElementsByClassName('page-selector')).forEach(ele => {
            if(ele.classList.contains('curr-page')){
                return;
            }else{
                ele.addEventListener('click',() => this.options.selectEvent(parseInt(ele.textContent)));
            }
        })

    }
}

export default Pagination;