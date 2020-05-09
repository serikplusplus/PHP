/* 
 * mandellib.js
 *
 *
 * ------ Глобальные переменные проводника ---- 
 */
var canvas;
var ctx;

var i_max = 1.5;
var i_min = -1.5;
var r_min = -2.5;
var r_max = 1.5;

var max_iter = 1024;
var escape = 100;
var palette = [];


/* 
 * ------- Код проводника --------
 *
 */

//
// Упаковка данных, которые посылаются исполнителю
//
function createTask(row) {
	var task = {
		row: row,				// номер строки для работы
		width: rowData.width,   // ширина объекта ImageData для заполнения 
		generation: generation, // глубина в данный момент
		r_min: r_min,
		r_max: r_max,
		i: i_max + (i_min - i_max) * row / canvas.height,
		max_iter: max_iter,
		escape: escape
	};
	return task;
}
//
// Эта функция отображает числа диапазона (0 - max_iter) в 
// (0 - 256), после чего заполняет palette значениями (r, g, b),
// так что цвета в соседних элементах массива относительно 
// близки друг к другу по цвету, и увеличение каждой из
// компонент r, g, b с разной скоростью хорошо работает при 
// заполнении спектра для max_iter > 256.
//
//
function makePalette() {
    function wrap(x) {
        x = ((x + 256) & 0x1ff) - 256;
        if (x < 0) x = -x;
        return x;
    }
    for (i = 0; i <= this.max_iter; i++) {
        palette.push([wrap(7*i), wrap(5*i), wrap(11*i)]);
    }
}

//
// drawRow() отображает значения массива, возвращенного исполнителем
// 	для одной строки в цвет, используя palette.
//
function drawRow(workerResults) {
    var values = workerResults.values;	// Массив значений, который исполнитель прислал назад
    var pixelData = rowData.data;		// Фактические пикселы в объекте ImageData
										// Переменная pixelData содержит копию сылки
										// 	rowData.data, так что изменение pixelData
										// 	изменяет rowData.data!!!
    for (var i = 0; i < rowData.width; i++) {  // для каждого пиксела в строке
		var red = i * 4;
		var green = i * 4 + 1;
		var blue = i * 4 + 2;
		var alpha = i * 4 + 3;

        pixelData[alpha] = 255; // установка alpha к непрозрачности

		// если массив значений имеет отрицательное число, установка черного цвета
        if (values[i] < 0) {
            pixelData[red] = pixelData[green] = pixelData[blue] = 0;
        } else {
			//
			// отображение числа из массива значений, возвращенного исполнителем,
			// в цвет из palette
			//
            var color = this.palette[values[i]];

			//
			// каждый цвет имеет компоненту rgb; для установки rgb 
			// пиксела отдельно устанавливаются r, g, b.
			//
            pixelData[red] = color[0];
            pixelData[green] = color[1];
            pixelData[blue] = color[2];
        }
    }
	//
	// рисование строки в canvas
	// workerData.row - это номер строки, с которой ведется работа
	// rowData содержит данные, которые только что обновились!
	// начало со столбца 0, так что передаются: x, y = 0, row (столбец)
	//
    ctx.putImageData(this.rowData, 0, workerResults.row);
}


//
// setupGraphics() устанавливает некоторые некоторые из начальных значений для переменных, используемых
// 	 в вычислениях мандельброта, а также устанавливает ширину и высоту canvas
//	 к ширине и высоте окна.
//
function setupGraphics() {

	canvas = document.getElementById("fractal");
	ctx = canvas.getContext("2d");

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var width = ((i_max - i_min) * canvas.width / canvas.height);
	var r_mid = (r_max + r_min) / 2;
	r_min = r_mid - width/2;
	r_max = r_mid + width/2;

	rowData = ctx.createImageData(canvas.width, 1);

	makePalette();
}
