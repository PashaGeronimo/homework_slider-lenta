(function ($) {

    $.fn.slide_pg = function (opt) {

        var options = $.extend({
            photos: 10,
            namefile: 'name-',
            lentaStep: 100,
            widthPic: 270,
            marginImg: 2,
            speed: 400,
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
            $('#container').css({
                'height': options.widthPic / 1.85 + 'px',
            });

            // длина ленты вычитая видимую часть + margin* кол фото*2
            var widthLenta = options.widthPic * (options.photos) - $('#container').css('width').slice(0, -2) + options.marginImg * (options.photos * 2);

            var stop = 1;
            // движение ленты вправо
            function my() {
                if (MoveLeft <= -widthLenta) stop = 0;
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
            });
            $('#right').mouseup(function () {
                stop = 0;
            });


            // движение ленты влево
            function myL() {
                if (MoveLeft >= 0) stop = 0;
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
            });
            $('#left').mouseup(function () {
                stop = 0;
            });



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













        }
        return this.each(make) // this - возвращает то, к чему применяется функция testPlug ( см. index.html )
    }

} (jQuery))