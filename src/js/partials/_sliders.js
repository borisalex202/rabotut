$(window).on('load', function () {
    $('.js-slider-main').slick({
        dots: true,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: options.prevArrow,
        nextArrow: options.nextArrow,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    arrows: false,
                    dots: true
                }
            }
        ]
    });
    $('.js-slider-reviews').slick({
        dots: false,
        prevArrow: options.prevArrow,
        nextArrow: options.nextArrow
    });
    $('.js-slider-employees').slick({
        dots: true,
        arrows: false
    });
});