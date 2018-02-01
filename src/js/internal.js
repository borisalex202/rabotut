var grid = {
    xs: 480,
    sm: 760,
    md: 992,
    lg: 1200
};
var elements = {
    cityBlock: $('.city-block'),
    cityCurrent: $('.city-current'),
    city: $('.city-block').find('li'),
    addressCurrent: $('.address-current'),
    menuBtn: $('.icon-menu'),
    mobileMenu: $('.site-header-mobile'),
    counterItemNumb: $('.counter-item .number'),
    siteHeader: $('.site-header'),
    siteFooter: $('.site-footer'),
    faqItem: $('.faq-item'),
    faqTitle: $('.faq-item__title'),
    faqContent: $('.faq-item__content'),
    officeChoice: $('.office-choice'),
    officeChoiceCurrent: $('.office-choice__current'),
    officeChoiceItem: $('.office-choice__item')
};
var options = {
    documentWith: $(document).width(),
    scrollbarWidth: scrollbarWidth(),
    prevArrow: '<button type="button" class="slick-prev"><svg class="icon icon-prev"><use xlink:href="#icon-prev"></use></svg></button>',
    nextArrow: '<button type="button" class="slick-next"><svg class="icon icon-next"><use xlink:href="#icon-next"></use></svg></button>'
};
var ytPlayers = [];

(function($) {

    @@include('./partials/_sliders.js');


    $(window).on('load resize', function () {

        /* Options */
        options.documentWith = $(document).width();

        $('.calc-height').css({
           minHeight: 'calc(100vh - '+ elements.siteHeader.outerHeight() +'px - '+ elements.siteFooter.outerHeight() +'px)'
        });

    });

    /* City block */
    elements.cityCurrent.on('click', function (e) {
        var _this = $(this);

        e.preventDefault();
        _this.closest(elements.cityBlock).toggleClass('opened');
    });
    /*elements.city.on('click', function (e) {
        var _this = $(this),
            _text = _this.find('a').text(),
            _address = _this.data('address');

        e.preventDefault();
        elements.city.removeClass('active');
        _this.addClass('active').closest(elements.cityBlock).removeClass('opened').find(elements.cityCurrent).find('span').text(_text);
        elements.addressCurrent.text(_address);
    });*/
    $(document).mouseup(function (e){
        var el = $(elements.cityBlock);
        if (!el.is(e.target)
            && el.has(e.target).length === 0) {
            elements.cityBlock.removeClass('opened');
        }
    });

    /* Mobile menu */
    elements.menuBtn.on('click', function (e) {
        e.preventDefault();

        elements.mobileMenu.toggleClass('opened');
        if(!elements.mobileMenu.hasClass('opened')) {
            $('body')
                .removeClass('no-scroll')
                .css({
                    paddingRight: 0
                });
        } else {
            $('body')
                .addClass('no-scroll')
                .css({
                    paddingRight: options.scrollbarWidth
                });
        }
    });
    $(document).mouseup(function (e){
        var el = $(elements.mobileMenu);
        if (!el.is(e.target)
            && el.has(e.target).length === 0) {
            elements.mobileMenu.removeClass('opened');
            $('body')
                .removeClass('no-scroll')
                .css({
                    paddingRight: 0
                });
        }
    });

    /* Form Styler */
    $('.select').styler();

    /* Counter animation */
    elements.counterItemNumb.each(function () {
        var _this = $(this);

        _this.data('count', false).text('0');
    });
    $(window).on('load scroll', function () {
        elements.counterItemNumb.each(function () {
            var _this = $(this),
                _val = _this.data('val');

            if ($(document).scrollTop() + $(window).height() > _this.offset().top
                && $(document).scrollTop() - _this.offset().top < _this.height()
                && _this.data('count') === false) {
                _this
                    .animateNumber({
                            number: _val,
                            easing: 'easeInQuad',
                            numberStep: function (now, tween) {
                                var floored_number = Math.floor(now),
                                    target = $(tween.elem);

                                target.text(floored_number);
                            }
                        },
                        2000
                    )
                    .data('count', true);
            }

        });
    });

    /* Mask */
    $('.phone').mask('+7(000) 00-00-000');


    /* Faq */
    elements.faqTitle.on('click', function () {
        var _this = $(this),
            _item = _this.closest(elements.faqItem),
            _content = _item.find(elements.faqContent);

        _item.toggleClass('active');
        _content.slideToggle();
    });

    $('.search-filter').on('click', function () {
        var _this = $(this);

        _this.closest('.search-vacancies__filter').addClass('active').find('.search-vacancies__form input').focus();
    });
    $(document).mouseup(function (e){
        var el = $('.search-vacancies__form');
        if (!el.is(e.target)
            && el.has(e.target).length === 0) {
            $('.search-vacancies__filter').removeClass('active');
        }
    });

    $('.sort-mobile__current').on('click', function () {
        $(this).closest('.sort-mobile').toggleClass('active');
    });
    /*$('.sort-mobile ul li').on('click', function () {
        var _this = $(this),
            _sortBlock = _this.closest('.sort-mobile'),
            _currentColor = _sortBlock.find('.color'),
            _currentText = _sortBlock.find('.text');

        _sortBlock.removeClass('active');
        _currentColor.css('background-color', _this.data('color'));
        _currentText.text(_this.text());
    });*/
    $(document).mouseup(function (e){
        var el = $('.sort-mobile');
        if (!el.is(e.target)
            && el.has(e.target).length === 0) {
            el.removeClass('active');
        }
    });

    elements.officeChoiceCurrent.on('click', function () {
        var _this = $(this);

        _this.closest(elements.officeChoice).toggleClass('active');
    });
    elements.officeChoiceItem.on('click', function () {
        var _this = $(this),
            _city = _this.text(),
            _data = _this.data('coords'),
            _lat = _data[0],
            _lng = _data[1];

        elements.officeChoiceItem.removeClass('active');
        _this.addClass('active');
        elements.officeChoiceCurrent.text(_city);
        if(_data) {
            myMap.setCenter([_lat, _lng]);
            getOfficeList(_city);
        }
        _this.closest(elements.officeChoice).removeClass('active');
    });
    $(document).on('click', '.office-choice__close', function () {
        var _this = $(this);

        _this.closest(elements.officeChoice).removeClass('active');
    });
    $(document).mouseup(function (e){
        var el = $(elements.officeChoice);
        if (!el.is(e.target)
            && el.has(e.target).length === 0) {
            el.removeClass('active');
        }
    });

    $(document).on('click', '.js-play-video', function () {
        var idVideoEl = $(this).closest('.youtube-block').find('.youtube-video__iframe').attr('id');
        $(this).closest('.youtube-block').addClass('active');

        for(var ind=0; ind<ytPlayers.length; ind++) {
            if(ytPlayers[ind].a.id == idVideoEl) {
                playYTVideo(ytPlayers[ind]);
                break;
            }
        }
    });

})($);

/* Functions */
function scrollbarWidth() {
    var documentWidth = parseInt(document.documentElement.clientWidth);
    var windowsWidth = parseInt(window.innerWidth);
    var scrollbarWidth = windowsWidth - documentWidth;
    return scrollbarWidth;
}

/* Youtube API */
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
    $('.youtube-video__iframe').each(function(i,e){
        ytPlayers[i] = new YT.Player('video_' + $(e).data('video'), {
            height: '360',
            width: '640',
            videoId: $(e).data('video'),
            playerVars: {'autoplay' : 0, 'showinfo': 0, 'rel': 0, 'controls': 1, 'loop': 0, 'enablejsapi' : 1, 'playlist': $(e).data('video') }
        });
    });
}
function playYTVideo(e) {
    e.playVideo();
}

function stopYTVideo(e) {
    e.stopVideo();
}