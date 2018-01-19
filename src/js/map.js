var markersArray = [
    {
        id: 1,
        title: 'П1”',
        city: 'Москва',
        metroIcon: 'img/svg/metro1.svg',
        metro: 'Новые Черемушки',
        location: 'Ул. Аранская, 35, офис 303',
        phone1: '8-3519-20-41-49',
        phone2: '8-922-709-90-72',
        time: 'Пн-Пт:  9:30 -18:00, <br>Сб-Вс: выходной',
        lat: 55.7727359,
        lng: 37.5864169,
        zIndex: 1
    },
    {
        id: 2,
        title: 'П2”',
        city: 'Москва',
        metroIcon: 'img/svg/metro2.svg',
        metro: 'Проспект Вернадского',
        location: 'Ул. Гагарина, 48, офис 34',
        phone1: '8-3519-20-41-49',
        email: 'emailname@gmail.com',
        lat: 55.7227359,
        lng: 37.5964169,
        zIndex: 2
    },
    {
        id: 3,
        title: 'П3”',
        city: 'Москва',
        metroIcon: 'img/svg/metro3.svg',
        metro: 'Измайловская',
        location: 'Ул. Рокоссовского, 48, офис 34',
        phone1: '8-3519-20-41-49',
        time: 'Пн-Пт:  9:30 -18:00, <br>Сб-Вс: выходной',
        lat: 55.7627359,
        lng: 37.6264169,
        zIndex: 3
    },
    {
        id: 4,
        title: 'П4”',
        city: 'Москва',
        location: 'Ул. Льва Сапеги, 7-76',
        metroIcon: 'img/svg/metro4.svg',
        metro: 'Шоссе Энтузиастов',
        phone1: '8-3519-20-41-49',
        phone2: '8-922-709-90-72',
        time: 'Пн-Пт:  9:30 -18:00, <br>Сб-Вс: выходной',
        lat: 55.7227359,
        lng: 37.6864169,
        zIndex: 4
    },
    {
        id: 5,
        title: 'П5”',
        city: 'Москва',
        metroIcon: 'img/svg/metro5.svg',
        metro: 'Новый Арбат',
        location: 'Ул. Гурского, 178, офис 2',
        phone1: '8-3519-20-41-49',
        time: 'Пн-Пт:  9:30 -18:00, <br>Сб-Вс: выходной',
        email: 'emailname@gmail.com',
        lat: 55.7527359,
        lng: 37.5464169,
        zIndex: 5
    },
    {
        id: 6,
        title: 'П1”',
        city: 'Санкт-Петербург',
        location: 'ул. Красноармейская, 45',
        phone1: '+375 (22) 652-58-11',
        email: 'emailname@gmail.com',
        lat: 59.8746888,
        lng: 30.3680456,
        zIndex: 6
    },
    {
        id: 7,
        title: 'П2”',
        city: 'Санкт-Петербург',
        location: 'ул. Красноармейская, 45',
        phone1: '+375 (22) 652-58-11',
        email: 'emailname@gmail.com',
        lat: 59.8978258,
        lng: 30.3683126,
        zIndex: 7
    },
    {
        id: 8,
        title: 'П1”',
        city: 'Уфа',
        location: 'ул. Красноармейская, 45',
        phone1: '+375 (22) 652-58-11',
        email: 'emailname@gmail.com',
        lat: 54.8088967,
        lng: 55.8807934,
        zIndex: 8
    }
];
var markers = [];
var myMap;
var iconStandard;
var iconActive;

ymaps.ready(function () {
    myMap = new ymaps.Map('office-map', {
            center: [55.771574, 37.613856],
            zoom: 11,
            controls: [],
            scrollWhell: false
        }, {
            searchControlProvider: 'yandex#search'
        }),

        ZoomLayout = ymaps.templateLayoutFactory.createClass("<div class='zoom'>" +
            "<div id='zoom-in' class='zoom-in'>+</div>" +
            "<div id='zoom-out' class='zoom-out'>—</div>" +
            "</div>", {

            build: function () {
                ZoomLayout.superclass.build.call(this);

                this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
                this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

                $('#zoom-in').bind('click', this.zoomInCallback);
                $('#zoom-out').bind('click', this.zoomOutCallback);
            },

            clear: function () {
                $('#zoom-in').unbind('click', this.zoomInCallback);
                $('#zoom-out').unbind('click', this.zoomOutCallback);

                ZoomLayout.superclass.clear.call(this);
            },

            zoomIn: function () {
                var map = this.getData().control.getMap();
                map.setZoom(map.getZoom() + 1, {checkZoomRange: true});
            },

            zoomOut: function () {
                var map = this.getData().control.getMap();
                map.setZoom(map.getZoom() - 1, {checkZoomRange: true});
            }
        }),
        zoomControl = new ymaps.control.ZoomControl({options: {layout: ZoomLayout}});

    getOfficeList('Москва');
    myMap.controls.add(zoomControl);
    myMap.behaviors.disable('scrollZoom');

    for (var i = 0; i < markersArray.length; i++) {
        var data = markersArray[i];


        markers[i] = new ymaps.Placemark([data.lat, data.lng], {}, {
            iconLayout: 'default#image',
            iconImageHref: 'img/pin-standard.png',
            iconImageSize: [82, 62],
            iconImageOffset: [-41, -31]
        });
        myMap.geoObjects.add(markers[i]);

        markers[i].events.add('click', function (e) {
            var activeGeoObject = e.get('target'),
                lat = activeGeoObject.geometry._coordinates[0],
                lng = activeGeoObject.geometry._coordinates[1];

            setTimeout(function () {
                $('.office-item').each(function () {
                    var _this = $(this),
                        _lat = _this.data('lat'),
                        _lng = _this.data('lng');

                    _this.removeClass('active');
                    if (_lat === lat && _lng === lng) {
                        _this.addClass('active');
                    }
                });
            }, 100);
            myMap.setCenter([lat, lng], 11);
            for (var i = 0; i < markersArray.length; i++) {
                markers[i].options.set('iconImageHref', 'img/pin-standard.png');

                if(markers[i].geometry._coordinates[0] === lat && markers[i].geometry._coordinates[1] === lng) {
                    getOfficeList(markersArray[i].city);
                    $('.office-choice__current').text(markersArray[i].city);
                }
            }
            activeGeoObject.options.set('iconImageHref', 'img/pin-active.png');
        });
    }
});

$(document).on('click', '.office-item__address', function () {
    var _this = $(this),
        _item = _this.closest('.office-item'),
        _lat = _item.data('lat'),
        _lng = _item.data('lng');


    $('.office-item').removeClass('active');
    _item.addClass('active');
    for (var i = 0; i < markersArray.length; i++) {
        var lat = markers[i].geometry._coordinates[0],
            lng = markers[i].geometry._coordinates[1];

        markers[i].options.set('iconImageHref', 'img/pin-standard.png');
        if (_lat === lat && _lng === lng) {
            myMap.setCenter([_lat, _lng],11);
            markers[i].options.set('iconImageHref', 'img/pin-active.png');
        }
    }
});

function getOfficeList(cityName) {
    $('.office-list').find('.office-item').remove();

    var cityCount = 0;
    for (var i = 0; i < markersArray.length; i++) {
        var data = markersArray[i];

        if(cityName === data.city) {
            $('.office-list').append('' +
                '<li class="office-item" data-marker-id="'+ data.id +'" data-lat="'+ data.lat +'" data-lng="'+ data.lng +'">' +
                    (data.location ? '<span class="office-item__address">'+ data.location +'</span>' : '') +
                    (data.metro ? '<span class="office-item__metro">' + (data.metroIcon ? '<img src="'+ data.metroIcon +'" alt="">' : '') + '<span>'+ data.metro +'</span></span>' : '') +
                    (data.phone1 ? '<a href="tel:'+ data.phone1 +'" class="office-item__phone">'+ data.phone1 +'</a>' : '') +
                    (data.phone2 ? '<a href="tel:'+ data.phone2 +'" class="office-item__phone">'+ data.phone2 +'</a>' : '') +
                    (data.time ? '<span class="office-item__time">'+ data.time +'</span>' : '') +
                    (data.email?'<a href="mailto:'+ data.email +'" class="office-item__email">'+ data.email +'</a>' : '') +
                '</li>');
            cityCount++;
        }
    }
    if(cityCount === 0) {
        $('.office-list').append('<li class="office-item _empty">К сожалению в этом городе нет офисов!</li>')
    }
}