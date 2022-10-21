const URL = 'https://vps.tonychouteau.fr:8090/';

let $result;

let g_isDrawing = false;
let g_image;

const G_MATRIX_SIZE = 28;
let g_matrix = [];

let g_refreshPrediction = () => {
	if (g_matrix.length !== G_MATRIX_SIZE) {
		return;
	}
	$.ajax({
		type: 'POST',
		url: URL,
		dataType: "json",
		contentType: 'application/json',
		data: JSON.stringify({data: g_matrix}),
	}).done((res) => {
		res = res;
		console.log(typeof res)
		let index = res.indexOf(Math.max(...res));
		console.log(res, index, $result);
		$result.html(index);
	});
};

setInterval(() => {
	if (g_isDrawing) {
		g_refreshPrediction();
	}
}, 200);
