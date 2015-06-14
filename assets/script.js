new Pikaday({
    format: 'YYYY/MM/DD',
    minDate: moment().toDate(),
    maxDate: moment().add(1, 'years').toDate(),
    yearRange: 1,
    field: document.getElementById('checkin')
});
new Pikaday({
    format: 'YYYY/MM/DD',
    minDate: moment().toDate(),
    maxDate: moment().add(1, 'years').toDate(),
    yearRange: 1,
    field: document.getElementById('checkout')
});

// Swiper config
mySwiper = new Swiper('.swiper-container', {
    paginationClickable: true,
    autoplayDisableOnInteraction: false,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    // pagination: '.swiper-pagination',
    // scrollbar: '.swiper-scrollbar',
    autoplay: 4500,
    speed: 500,
    // effect: 'fade',
    loop: true,
    // spaceBetween: 30,
    // fade: { crossFade: true },
    // direction: 'vertical',
    // grabCursor: true,
});

// memory intensive, prefer using 1 blur image (in this case using slide 0)
// mySwiper.on('slideChangeStart', function (mySwiper) {
//     remCls(getCls("swiper-bg")[0], "slide-"+mySwiper.previousIndex);
//     addCls(getCls("swiper-bg")[0], "slide-"+mySwiper.activeIndex);
// });

// new Waypoint({
//     element: document.getElementById('tobe_header'),
//     handler: function() {
//         // tmp = element.offsetTop - element.scrollTop + element.clientTop;
//         // element.style.position = (element.style.position!=="fixed" && tmp>0) ? "fixed" : "";
//         // console.log(tmp);
//     }
// });
app = angular.module('vbali', []);
app.controller('MainCtrl', function ($scope, $http) {
    $http.get('./assets/mock-server.json').success(function(data) {
        remCls(getTag("HTML")[0], "load");
        remCls(getTag("BODY")[0], "load");
    });
});