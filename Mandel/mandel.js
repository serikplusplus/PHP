/* 
 * mandel.js
 */

var numberOfWorkers = 8;
var workers = [];
var rowData;
var nextRow = 0;
var generation = 0;

window.onload = init;

function init() {
	setupGraphics();

	//
	// При щелчке по canvas, вызывается обработчик.
	// Ему передается объект события, который содержит
	//  позицию щелчка мыши x, y. Эти значения
	//  передаются к handleClick().
	//
	canvas.onclick = function(event) {
		handleClick(event.clientX, event.clientY);
	};
	//
	// При изменении размера окна браузера, нужно
	//	изменить размеры canvas и перезапустить исполнители.
	//
	window.onresize = function() {
		resizeToWindow();
	};

	//
	// Создание всех исполнителей и установка обработчика сообщений.  
	// 	Добавление каждого исполнителя к мпссиву исполнителей.
	//
	for (var i = 0; i < numberOfWorkers; i++) {
		var worker = new Worker("worker.js");

		worker.onmessage = function(event) {
			processWork(event.target, event.data)
		}

		worker.idle = true;
		workers.push(worker);
	}

	//
	// Запуск исполнителей
	//
	startWorkers();

}

//
// Определение функции startWorkers()
//	Эта функция переустанавливает исполнители, чтобы стартовать их работу
//		с вершины фрактала (строка 0). Она циклит по
//		всему массиву исполнителей и назначает
//		каждому исполнителю задачу вычисления строки.
//	Посылая сообщение задаче, мы запускаем
//		вычисления исполнителем.
//
function startWorkers() {
	generation++;
	nextRow = 0;
	for (var i = 0; i < workers.length; i++) {
		var worker = workers[i];
		if (worker.idle) {
			var task = createTask(nextRow);
			worker.idle = false;
			worker.postMessage(task);
			nextRow++;
		}
	}
} 

//
// Определение функции processWork()
// 	Эта функция вызывается, когда исполнитель отправляет 
//		назад сообщение с результатами.
//	Если исполнитель работал на текущей генерации
//		фрактала, рисуется строка данных, иначе
//		данные просто отбрасывются.
//	Как только результаты использованы, исполнитель назначается
//		для вычисления другой строки.
//    
function processWork(worker, workerResults) {
	if (workerResults.generation == generation) {
		drawRow(workerResults);
	}
	reassignWorker(worker);
}

//
// Определение функции reassignWorker()
//	Эта функция дает свободному исполнителю его следующую задачу.
//
function reassignWorker(worker) {
	var row = nextRow++;
	if (row >= canvas.height) {
		worker.idle = true;
	} else {
		var task = createTask(row);
		worker.idle = false;
		worker.postMessage(task);
	}
}


// Определение функции handleClick()
//	Эта функция принимает позицию x, y, по которой щелкнул
//		пользователь и устанавливает параметры для нового
//		фрактала. Коофициент увеличения (zoom) устанавливает 
//		новые границы множества Мандельброта для 
//		увеличения в размере. Новый фрактал поддерживает
//		соотношение сторон текущего размера canvas.
//	Исполнители запускаются на новом увеличенном
//		фрактале.
//
function handleClick(x, y) {
	var width = r_max - r_min;
	var height = i_min - i_max;
	var click_r = r_min + ((width * x) / canvas.width);
	var click_i = i_max + ((height * y) / canvas.height);

	var zoom = 8;

	r_min = click_r - width/zoom;
	r_max = click_r + width/zoom;
	i_max = click_i - height/zoom;
	i_min = click_i + height/zoom;

	startWorkers();
}

//
// Определение функции resizeToWindow()
//	Когда пользоватедь изменяет размеры окна браузера,
//		эта функция вызывается для изменения размера canvas,
//		и переустанавливает параметры фрактала (изменение
//		протяженности границы и поддержание нового
//		соотношения сторон окна).
//	Исполнители перезапускаются для вычисления новогот фрактала,
//		базирующегося на новом размере.
//
function resizeToWindow() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var width = ((i_max - i_min) * canvas.width / canvas.height);
	var r_mid = (r_max + r_min) / 2;
	r_min = r_mid - width/2;
	r_max = r_mid + width/2;
	rowData = ctx.createImageData(canvas.width, 1);

	startWorkers();
}

