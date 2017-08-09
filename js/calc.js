let memory = [];
let id = 0;
let index = 0;
let plot = 0;
let parser = math.parser();

math.import({
	plot: (...funcs) => {
		let data = [];
		funcs.forEach(fn => {
			data.push({ fn: fn })
		});
		plot++;
		$('#runner').append($(`<div class="plot" id="p${plot}"></div>`));
		functionPlot({
			target: `#p${plot}`,
			width: innerWidth <= 640 ? innerWidth : 640,
			height: 480,
			title: '',
			grid: true,
			data
		});
	}
});

$('#f0').focus();

$('#runner').on('keydown', '.field', function (e) {
	switch (e.key) {
		case 'Enter':
			let str = $(this).val();
			memory.push(str);
			index = memory.length;
			if (str == 'clear') {
				$('#runner').empty();
			}
			else {
				id++;
				$(this).prop('disabled', true).attr('placeholder', '');
				try {
					let result = parser.eval(str);
					if (typeof result == 'function') {
						result = result.syntax;
					}
					$('#runner').append($('<div class="result"></div>').text(result));
				}
				catch (err) {
					$('#runner').append($('<div class="error"></div>').text(err));
				}
			}
			$('#runner').append($(`<input type="text" id="f${id}" class="field" placeholder="Math.js Expression">`));
			$(`#f${id}`).focus();
			break;
		case 'ArrowUp':
			if (index > 0) {
				$(this).val(memory[--index]);
			}
			break;
		case 'ArrowDown':
			if (index < memory.length) {
				$(this).val(memory[++index]);
			}
			break;
	}
});

$("#help-link").click(function(){
	$("#help").toggle();
});
