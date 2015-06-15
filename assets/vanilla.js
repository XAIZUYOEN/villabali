var i;
var addJSStyle = function (css) {
        var styleElement = document.getElementById('styles_js');
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.type = 'text/css';
            styleElement.id = 'styles_js';
            document.getElementsByTagName('head')[0].appendChild(styleElement);
        }
        styleElement.appendChild(document.createTextNode(css));
    },
    stripURL = function (url) {
        return url.split('?')[0].split('#')[0];
    },
    noCallback = function (e) {
        i = e.preventDefault ? e.preventDefault() : function () { e.returnValue = false; };
    },
    insertAfter = function (n, e) {
        e.parentNode.insertBefore(n, e.nextSibling);
    },
    bindEvent = function (e, t, n) {
        i = e.addEventListener ? e.addEventListener(t, n, false) : e.attachEvent && e.attachEvent('on' + t, n);
    },
    getQs = function (e) {
        var t = location.search.match(new RegExp('[?&]' + e + '=([^&]*)(&?)', 'i'));
        return t ? t[1] : t;
    },
    getId = function (e) {
        return document.getElementById(e);
    },
    getTag = function (e) {
        return document.getElementsByTagName(e);
    },
    getClass = function (e) {
        return document.getElementsByClassName(e);
    },
    getAll = function (e) {
        return document.querySelectorAll(e);
    },
    getOne = function (e) {
        return document.querySelector(e);
    },
    getVal = function (e) {
        return e.value;
    },
    getTxt = function (e) {
        return e.innerHTML;
    },
    setVal = function (e, t) {
        e.value = t;
    },
    setTxt = function (e, t) {
        e.innerHTML = t;
    },
    addClass = function (e, t) {
        i = e.classList ? e.classList.add(t) : function () { e.className += ' ' + t; };
    },
    remClass = function (e, t) {
        i = e.classList ? e.classList.remove(t) : function () { e.className = e.className.replace(new RegExp('(^|\\b)' + t.split(' ').join('|') + '(\\b|$)', 'gi'), ' '); };
    },
    hasClass = function (e, t) {
        return new RegExp(' ' + t + ' ').test(' ' + e.className + ' ');
    },
    setCookie = function (name, value, days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        i = days ? '; expires=' + date.toGMTString() : '';
        document.cookie = name + '=' + value + i + '; path=/';
    },
    getCookie = function (name) {
        var c, nameEQ = name + '=', ca = document.cookie.split(';');
        for (i = 0; i < ca.length; i++) {
            c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    },
    remCookie = function (e) {
        setCookie(e, '', -1);
    },
    ismobile = function () {
        if (sessionStorage.desktop) {return false; }
        if (localStorage.mobile) { return true; }
        var a = navigator.userAgent || navigator.vendor || window.opera;
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) { return true; }
        return false;
    },
    log = function (e, f) {
        if (!f) { console.log(e); }
    },
    err = function (e, f) {
        if (!f) { console.error(e); }
    };
document.getElementsByClassName = document.getElementsByClassName || function (t) {
    var a = [], re = new RegExp('(^| )' + t + '( |$)'), els = document.getElementsByTagName('*');
    for (i = els.length - 1; i >= 0; i -= 1) {
        if (re.test(els[i].className)) {
            a.push(els[i]);
        }
    }
    return a;
};
Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
};
NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (i = this.length - 1; i >= 0; i--) {
        if (this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
};