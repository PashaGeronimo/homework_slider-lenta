(function ($) {

    $.fn.slide_pg = function (opt) {

        var options = $.extend({
            photos: 10,
            namefile: 'name-',
            widthPic: 270,
            marginImg: 2,
            speed: 2,
            centerFrame: 4,

        }, opt);


        var make = function () {

            //кадр по центру в начале
            var MoveLeft = -(options.centerFrame * options.widthPic - 900 / 2 + (options.marginImg * 2) - options.widthPic / 2);
            $('#lenta').css({
                'left': MoveLeft + 'px',
            });

            // рисуем ленту
            for (i = 1; i <= options.photos; i++) {
                $('#lenta').append('<img src="img/' + options.namefile + i + '.jpg" id="img' + i + '" >');
            };

            //параметры каждой картинки 
            $('[id *=img ]').css({
                'width': options.widthPic + 'px',
                'margin': options.marginImg + 'px',
            });

            // высота обрезки
            var heightcrop = options.widthPic / 1.85;
            $('#container').css({
                'height': options.widthPic / 1.85 + 'px',
            });

            $('#bigphoto').css('height', 'calc( 100vh - ' + (heightcrop + 40) + 'px)');
            // длина ленты вычитая видимую часть + margin* кол фото*2
            var widthLenta = options.widthPic * (options.photos) - $('#container').css('width').slice(0, -2) + options.marginImg * (options.photos * 2);

            var stop = 1;
            // движение ленты вправо
            function my() {
                if (MoveLeft <= -widthLenta) {
                    stop = 0;
                    $('#right').css({
                        'opacity': 0.5,
                    });
                }
                if (stop == 1) {
                    MoveLeft = MoveLeft - options.speed;
                    $('#lenta').css({
                        'left': MoveLeft + 'px',
                    });
                    setTimeout(my, 0.1);
                }
            }
            $('#right').mousedown(function () {
                stop = 1;
                my();
                $('#left').css({
                    'opacity': 1,
                });
            });
            $('#right').mouseup(function () { stop = 0; });
            $('#right').mouseleave(function () { stop = 0; });


            // движение ленты влево
            function myL() {
                if (MoveLeft >= 0) {
                    stop = 0;
                    $('#left').css({
                        'opacity': 0.5,
                    });
                }
                if (stop == 1) {
                    MoveLeft = MoveLeft + options.speed;
                    $('#lenta').css({
                        'left': MoveLeft + 'px',
                    });
                    setTimeout(myL, 0.1);
                }
            }
            $('#left').mousedown(function () {
                stop = 1;
                myL();
                $('#right').css({
                    'opacity': 1,
                });
            });
            $('#left').mouseup(function () { stop = 0; });
            $('#left').mouseleave(function () { stop = 0; });



            // Регулировка размера кнопок
            $('.buttons').css({
                'top': +$('#container').css('top').slice(0, -2) + 39 - ((options.widthPic - 150) / 1.85) - 120 + 'px',
            });

            var sizbtn = 40 + ((options.widthPic - 150) / 3.6);
            $('#right').css({
                'border-top': '' + sizbtn + 'px solid transparent',
                'border-bottom': '' + sizbtn + 'px solid transparent',
            });

            $('#left').css({
                'border-top': '' + sizbtn + 'px solid transparent',
                'border-bottom': '' + sizbtn + 'px solid transparent',
            });

            //начальный фильтр картинок
            $('[id *=img ]').css({
                '-webkit-filter': 'contrast(0.9) brightness(90%) saturate(0.9)',
                'filter': 'contrast(0.9) brightness(90%) saturate(0.9)',
            });

            // наведение мышки на ленту
            $('[id *=img ]').hover(function () {
                $(this).css({
                    '-webkit-filter': 'contrast(1.1) brightness(110%)  saturate(1)',
                    'filter': 'contrast(1.1) brightness(110%)  saturate(1)',
                });
                $(this).mouseleave(function () {
                    $(this).css({
                        '-webkit-filter': 'contrast(0.9) brightness(90%) saturate(0.9)',
                        'filter': 'contrast(0.9) brightness(90%) saturate(0.9)',
                    });
                });
            });

            // загрузка большого фото
            $('#bigphoto').css({
                'background-image': 'url(img/work-' + options.centerFrame + '.jpg)',
            });

            // нажатие на мелкую иконку
            $('[id *=img ]').click(function () {
                $('#bigphoto').css({
                    'opacity': 0,
                });
                // устанавливаем картинку большую
                $('#bigphoto').css({
                    'background-image': 'url(img/work-' + $(this).attr('id').substr(3) + '.jpg)',

                });

                // плавно отображаем
                $('#bigphoto').animate({
                    opacity: 1
                }, 1500);


            });











        }
        return this.each(make) // this - возвращает то, к чему применяется функция testPlug ( см. index.html )
    }

} (jQuery))