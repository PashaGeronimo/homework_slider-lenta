(function($) {

    $.fn.slide_pg = function(opt) {

        var options = $.extend({
            photos: 10,
            namefile: 'name-',
            lentaStep: 100,
            widthPic: 270,

        }, opt);


        var make = function() {
            // получаем значение css left
            var MarginL = +$('#lenta').css('left').slice(0, -2); // обрезаем px

            // рисуем ленту
            for (i = 1; i < options.photos; i++) {
                $('#lenta').append('<img src="img/' + options.namefile + i + '.jpg" id="img' + i + '" >');

            };

            //параметры каждой картинки
            $('[id *=img ]').css({
                'width': options.widthPic + 'px',
                'margin': '2px',
            });

            // высота обрезки
            $('#container').css({
                'height': options.widthPic / 1.85 + 'px',
            });
            
            // длина ленты
            var widthAll = $('#img5').innerWidth() * options.photos;



            // нажатие влево
            $('#left').click(function() {
                MarginL += options.lentaStep;
                $('#lenta').animate({
                    left: MarginL + 'px',
                }, 400);
                console.log(MarginL);
            });

            // нажатие вправо
            $('#right').click(function() {
                MarginL -= options.lentaStep;
                $('#lenta').animate({
                    left: MarginL + 'px',
                }, 400);
                      console.log(MarginL);
            });

            console.log(options.widthPic);

       
            $('.buttons').css({
                'top':  +$('#container').css('top').slice(0, -2) + 39 - ((options.widthPic-150)/1.85) - 120 + 'px',
            });

            var sizbtn = 40 + ((options.widthPic-150)/3.6);
           // Регулировка размера кнопок
            $('#right').css({
            'border-top': ''+sizbtn+'px solid transparent',
            'border-left': '90px solid #363',
            'border-bottom': ''+sizbtn+'px solid transparent',
            
            });

            $('#left').css({
            'border-top': ''+sizbtn+'px solid transparent',
            'border-right': '90px solid #363',
            'border-bottom': ''+sizbtn+'px solid transparent',
            });













        }
        return this.each(make) // this - возвращает то, к чему применяется функция testPlug ( см. index.html )
    }

}(jQuery))