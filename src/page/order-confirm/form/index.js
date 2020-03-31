import './index.css';
import _address from '../../../sevice/address-service';
import modal from '../../../util/modal/index';
import _mm from '../../../util/mm';

function renderHTML(data){
    return `
            <div class="form-line">
                        <label class="label" for="receiver-name">
                            <span class="required">*</span>Name:
                        </label>
                        <input class="form-item" id="receiver-name" placeholder="Please input name of receiver"
                        value="${data.receiverName}">
                    </div>
                    <div class="form-line">
                        <label class="label" for="receiver-state">
                            <span class="required">*</span>State:
                        </label>
                        <select class="form-item" id="receiver-state" value="${data.receiverProvince}">
                            <option>IN</option>
                        </select>
                    </div>
                    <div class="form-line">
                        <label class="label" for="receiver-county">
                            <span class="required">*</span>County:
                        </label>
                        <select class="form-item" id="receiver-county" value="${data.receiverCity}">
                            <option>Tippecanoe</option>
                        </select>
                    </div>
                    <div class="form-line">
                        <label class="label" for="receiver-address">
                            <span class="required">*</span>Address:
                        </label>
                        <input class="form-item" id="receiver-address" placeholder="Please input address of receiver"
                        value="${data.receiverAddress}">
                    </div>
                    <div class="form-line">
                        <label class="label" for="receiver-phone">
                            <span class="required">*</span>Phone:
                        </label>
                        <input class="form-item" id="receiver-phone" placeholder="Please input phone number of receiver"
                        value="${data.receiverMobile}">
                    </div>
                    <div class="form-line">
                        <label class="label" for="receiver-zip">
                            <span class="required">*</span>ZipCode:
                        </label>
                        <input class="form-item" id="receiver-zip" placeholder="Please input zipcode of receiver" 
                        value="${data.receiverZip}">
                    </div>
                    <div class="form-line">
                        <a href="#" class="btn address-btn">Save shipping address</a>
            </div>
    `
}


let page = {
    data:{
        formData: '',
        container: '',
        type: 'new',
        addressId: ''
    },
    init: function () {
        this.data.container = document.getElementsByClassName('form')[0];
        this.bindEvent();
    },
    bindEvent: function () {
        document.body.addEventListener('click',(event) => {
            if(event.target ===  this.data.container.getElementsByClassName('address-btn')[0]) {
                this.data.formData = {
                    receiverName: document.getElementById('receiver-name').value.trim(),
                    receiverPhone: '010',
                    receiverMobile: document.getElementById('receiver-phone').value.trim(),
                    receiverProvince: document.getElementById('receiver-state').value.trim(),
                    receiverCity: document.getElementById('receiver-county').value.trim(),
                    receiverAddress: document.getElementById('receiver-address').value.trim(),
                    receiverZip: document.getElementById('receiver-zip').value.trim(),
                    id: this.data.addressId
                };
                if (this.validateForm()) {
                    if (this.data.type === 'new') {
                        _address.createAddress(this.data.formData, (res) => modal.updateHide(),
                            (err) => _mm.errorTips(err));
                    }
                    if (this.data.type === 'update') {
                        _address.updateAddress(this.data.formData, (res) => modal.updateHide(),
                            (err) => _mm.errorTips(err));
                    }
                }
            }
        })
    },
    validateForm: function () {
        return true;
    },
    changeType: function (type,addressId) {
        this.data.type = type;
        this.data.addressId = addressId;
        if(type === 'update'){
            _address.getAddress(addressId,(res) => {
                this.data.container.innerHTML = renderHTML(res);
            },(rej) => _mm.errorTips(rej));
        }else{
            this.data.container.innerHTML = renderHTML({
                receiverName: '',
                receiverPhone: '',
                receiverMobile: '',
                receiverProvince: '',
                receiverCity: '',
                receiverAddress: '',
                receiverZip: ''
            });
        }
    }
};

export default page;