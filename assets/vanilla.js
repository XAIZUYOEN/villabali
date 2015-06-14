function placeholder(el) {
    function getPH(el) { return el.getAttribute("placeholder") || "Placeholder"; }
    el.value = getPH(el);
    el.onblur = function () { if (this.value === '') { this.value = getPH(this); } };
    el.onfocus = function () { if (this.value === getPH(this)) { this.value = ''; } };
}
var tmp, me, i, ol, v, today, xbody, html;

if (!Number.isInteger) {
    Number.isInteger = function isInteger(nVal) {
        return typeof nVal === "number" && isFinite(nVal) && nVal > -9007199254740992 && nVal < 9007199254740992 && Math.floor(nVal) === nVal;
    };
}

var getCursorPos = function (ctrl) {
    var ie, i = 0;
    // IE Support
    if (document.selection) {
        ctrl.focus();
        ie = document.selection.createRange();
        ie.moveStart('character', -ctrl.value.length);
        i = ie.text.length;
    // Firefox support
    } else if (ctrl.selectionStart || ctrl.selectionStart === '0') {
        i = ctrl.selectionStart;
    }
    return i;
};

var setCursorPos = function (ctrl, pos) {
    if (ctrl.setSelectionRange) {
        ctrl.focus();
        ctrl.setSelectionRange(pos, pos);
    } else if (ctrl.createTextRange) {
        var range = ctrl.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
};

var getDocumentWH = function () {
    var W, H;
    W = Math.max(xbody.scrollWidth, xbody.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);
    H = Math.max(xbody.scrollHeight, xbody.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    return [ W, H ];
};

var getInnerWH = function () {
    var W = 0, H = 0;
    if (typeof (window.innerWidth) === 'number') {
        W = window.innerWidth;
        H = window.innerHeight;
    } else if (html && (html.clientWidth || html.clientHeight)) {
        W = html.clientWidth;
        H = html.clientHeight;
    } else if (xbody && (xbody.clientWidth || xbody.clientHeight)) {
        W = xbody.clientWidth;
        H = xbody.clientHeight;
    }
    return [ W, H ];
};
var getScrollXY = function () {
    var X = 0, Y = 0;
    if (typeof (window.pageYOffset) === 'number') {
        X = window.pageXOffset;
        Y = window.pageYOffset;
    } else if (xbody && (xbody.scrollLeft || xbody.scrollTop)) {
        X = xbody.scrollLeft;
        Y = xbody.scrollTop;
    } else if (html && (html.scrollLeft || html.scrollTop)) {
        X = html.scrollLeft;
        Y = html.scrollTop;
    }
    return [ X, Y ];
};


//=======================================
// VALIDATOR
//=======================================
var checkPhone = function (args) {
    tmp = false;
    if (args.length > 0 && args.match(/^([\+\(]*\d+[\.\-\)]*)+$/)) {
        tmp = true;
    }
    return tmp;
};
var checkEmail = function (args) {
    tmp = false;
    if (args.length > 0 && args.match(/^[A-Za-z0-9!#$%&'*+\/=?\^_`{|}~\-]+(?:\.[a-z0-9!#$%&'*+\/=?\^_`{|}~\-]+)*@(?:[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?$/)) {
        tmp = true;
    }
    return tmp;
};
var checkTime = function (args) {
    tmp = false;
    if (args.length > 0 && args.match(/^(0?\d|1\d|2[0-3]):[0-5]\d$/)) {
        tmp = true;
    }
    return tmp;
};
var checkDateGTE = function (args) {
    tmp = false;
    me = new Date(args);
    today = new Date(today);
    if (me instanceof Date && !isNaN(me.valueOf()) && me.getTime() >= today.getTime()) {
        tmp = true;
    }
    return tmp;
};
var checkDateLTE = function (args) {
    tmp = false;
    me = new Date(args);
    today = new Date(today);
    if (me instanceof Date && !isNaN(me.valueOf()) && me.getTime() <= today.getTime()) {
        tmp = true;
    }
    return tmp;
};

function getElementsByClassName(classname) {
    var a = [], re = new RegExp('(^| )' + classname + '( |$)'), els = document.getElementsByTagName("*");
    for (i = els.length - 1; i >= 0; i -= 1) {
        if (re.test(els[i].className)) {
            a.push(els[i]);
        }
    }
    return a;
}
//=======================================
// helper functions
//=======================================
var getId = function (obj) {
    return document.getElementById(obj);
};
var getTag = function (obj) {
    return document.getElementsByTagName(obj);
};
if (!document.getElementsByClassName) {
    document.getElementsByClassName = getElementsByClassName;
}
var getCls = function (obj) {
    return document.getElementsByClassName(obj);
};
var getAll = function (obj) {
    return document.querySelectorAll(obj);
};
var getOne = function (obj) {
    return document.querySelector(obj);
};
var getVal = function (obj) {
    return obj.value;
};
var getTxt = function (obj) {
    return obj.innerHTML;
};
var setVal = function (obj, val) {
    obj.value = val;
};
var setTxt = function (obj, val) {
    obj.innerHTML = val;
};

var addCls = function (el, className) {
    if (el.classList) {
        el.classList.add(className);
    } else {
        el.className += ' ' + className;
    }
};

var remCls = function (el, className) {
    if (el.classList) {
        el.classList.remove(className);
    } else {
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
};

var hasCls = function (el, className) {
    return new RegExp(' ' + className + ' ').test(' ' + el.className + ' ');
};

var setCookie = function (name, value, days) {
    var expires, date = new Date();
    if (days) {
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
};

var getCookie = function (name) {
    var c, nameEQ = name + "=", ca = document.cookie.split(';');
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
};

var eraseCookie = function (name) {
    setCookie(name, "", -1);
};

var ismobile = (function () {
    var a = navigator.userAgent || navigator.vendor || window.opera;
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) { return true; }
    return false;
}());