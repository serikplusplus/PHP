window.onload = function () {
//генерация цвета
    function generateColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    };
//генерация символа
    function randAa() {
        var s = '';
        s += String.fromCharCode(Math.random() * (126 - 33) + 33);
        return s;
    };
//генерация размера
    function randsize() {
        var s = '';
        s = Math.random() * (32 - 10) + 10;
        return s;
    };
//генерация отступа сверху
    function randtop() {
        var s = '';
        s = Math.random() * height;
        return s;
    };
//генерация отступа слева
    function randleft() {
        var s = '';
        s = Math.random() * width;
        return s;
    };

    let o = randsize();
    let arr = [];//масив символов
    let height = $(window).height() - o;
    let width = $(window).width() - o;
    let color = generateColor();
    let color1 = generateColor();
    $('body').css('backgroundColor', color);
    if (color != color1) {
        $('#g').css('color', color1);
    } else {
        location.reload();
    }
    $('#g').css('font-size', o);
    Top = randtop();
    $('#g').css('top', Top);
    Left = Math.random() * width;
    $('#g').css('left', Left);
    var z = randAa().toUpperCase();
    arr.push(z);
    alert(z);

//заполнения массива доп символов только уникальные символы
    var img = document.querySelectorAll(".b");
   
    for (i = 0; i < img.length; i++) {
        var randomNumber = randAa().toUpperCase();
        if (arr.indexOf(randomNumber) < 0) {
          arr.push(randomNumber);
        } else i--;
      }

      this.console.log(arr);//вывод масива в консоль

// вывод доп символов в елементы
    for (i = 0, len = img.length; i < len; i++)(function (a) {
        color1 = generateColor();
        if (color != color1) {
            img[i].style.color = color1;
        } else {
            location.reload();
        }
        o = randsize();
        img[i].style.fontSize = o + "px";
        height = $(window).height() - o;
        Top = randtop();
        img[i].style.top = Top + "px";
        width = $(window).width() - o;
        Left = randleft();
        img[i].style.left = Left + "px";
        img[i].innerHTML = arr[i+1];
    })(i);

    document.getElementById('g').innerHTML = z;//искаемый символ


    var base = 60;
    var clocktimer, dateObj, dh, dm, ds, ms;
    var readout = '';
    var h = 1,
        m = 1,
        tm = 1,
        s = 0,
        ts = 0,
        ms = 0,
        init = 0;


// таймер
    function StartTIME() {
        var cdateObj = new Date();
        var t = (cdateObj.getTime() - dateObj.getTime()) - (s * 1000);
        if (t > 999) {
            s++;
        }
        if (s >= (m * base)) {
            ts = 0;
            m++;
        } else {
            ts = parseInt((ms / 100) + s);
            if (ts >= base) {
                ts = ts - ((m - 1) * base);
            }
        }
        if (m > (h * base)) {
            tm = 1;
            h++;
        } else {
            tm = parseInt((ms / 100) + m);
            if (tm >= base) {
                tm = tm - ((h - 1) * base);
            }
        }
        ms = Math.round(t / 10);
        if (ms > 99) {
            ms = 0;
        }
        if (ms == 0) {
            ms = '00';
        }
        if (ms > 0 && ms <= 9) {
            ms = '0' + ms;
        }
        if (ts > 0) {
            ds = ts;
            if (ts < 10) {
                ds = '0' + ts;
            }
        } else {
            ds = '00';
        }
        dm = tm - 1;
        if (dm > 0) {
            if (dm < 10) {
                dm = '0' + dm;
            }
        } else {
            dm = '00';
        }
        dh = h - 1;
        if (dh > 0) {
            if (dh < 10) {
                dh = '0' + dh;
            }
        } else {
            dh = '00';
        }
        readout = dh + ':' + dm + ':' + ds + '.' + ms;
        clocktimer = setTimeout(StartTIME, 1);
    };
//обрабатываем клик по верному символу
    document.getElementById('g').addEventListener("click", function () {
        clearTimeout(clocktimer);
        init = 0;
        alert(readout);
    });

//старт таймера
    function Start() {
        dateObj = new Date();
        StartTIME();
        init = 1;
    }
    Start();
};