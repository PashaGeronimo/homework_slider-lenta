(function($) {

    $.fn.slide_pg = function(opt) {

        var options = $.extend({
            photos: 10,
            namefile: 'name-',
            lentaStep: 100,
            widthPic: 270,
            marginImg: 2,
            speed: 400,
            centerFrame: 4,

        }, opt);


        var make = function() {

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

            // движение ленты влево
            $('#left').click(function() {
                if (MoveLeft > -options.lentaStep) {
                    MoveLeft = 0;
                } else {
                    MoveLeft += options.lentaStep;
                };
                $('#lenta').animate({
                    left: MoveLeft + 'px',
                }, options.speed);

            });


            // движение ленты вправо

            $('#right').click(function() {
                if ((widthLenta + MoveLeft) < options.lentaStep) {
                    MoveLeft = -widthLenta;
                } else {
                    MoveLeft -= options.lentaStep;
                };
                $('#lenta').animate({
                    left: MoveLeft + 'px',
                }, options.speed);
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

}(jQuery))