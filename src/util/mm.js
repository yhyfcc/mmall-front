

const conf = {
    serverHost: ''
};

let _mm = {
    doLogin: () => {
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    goHome: () => {
        window.location.href = './index.html';
    },
    getServerUrl: (path) => {
        return conf.serverHost + path;
    },
    getUrlParam: (name) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name) ? urlParams.get(name) : null;
    },
    renderHtml: (htmlTempleate, data) => {

    },
    successTips: (msg) => {
        alert(msg || 'Operation successful');
    },
    errorTips: (msg) => {
        alert(msg || 'Something went wrong');
    },
    validate: (value, type) => {
        value = String(value).trim();
        if(type === 'require'){
            return !!value;
        }
        if(type === 'phone'){
            return /^1\d{10}$/.test(value);
        }
        if(type === 'email'){
            return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(value)
        }
    }
};

export default _mm;