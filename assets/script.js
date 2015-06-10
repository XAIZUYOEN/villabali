var tmp;
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
new Swiper('.swiper-container', {
    loop: true,
    effect: 'fade',
    pagination: '.swiper-pagination',
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    paginationClickable: true,
    autoplay: 3000,
    autoplayDisableOnInteraction: false,
    // direction: 'vertical',
    // grabCursor: true,
    // scrollbar: '.swiper-scrollbar',
});
tmp = document.getElementById('tobe_header');
new Waypoint({
    element: tmp,
    handler: function() {
        console.log('sasugaaa');
    }
});