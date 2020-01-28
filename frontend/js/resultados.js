/*jslint browser: true*/
/*global $, jQuery, alert*/

"use strict";
window.chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};

(function (root, $) {
	$.ajax({
		type: 'GET',
		url: 'https://nope.execute-api.us-east-1.amazonaws.com/prod/resultados',
		headers: {'Accept': 'application/json', 'x-api-key': 'xxxxxxxxxxxx'},
		dataType: 'json',
	}).done(function (data) {
		console.log("Get resultados: " + data);

		$(data).each(function (index, item) {
			var pregunta = item['pregunta'];
			var resultados = item['resultados'];

			console.log("pregunta: " + pregunta);
			console.log("resultados: " + resultados);
			var muymalo = resultados['muymalo'];
			var malo = resultados['malo'];
			var regular = resultados['regular'];
			var bueno = resultados['bueno'];
			var muybueno = resultados['muybueno'];

			var ctx = document.getElementById(pregunta).getContext('2d');
			var chart = new Chart(ctx, {
				type: 'doughnut',

				// The data for our dataset
				data: {
					labels: ['Muy Malo (' + muymalo + ')' , 'Malo (' + malo+ ')' , 'Regular (' + regular + ')' , 'Bueno (' + bueno + ')' , 'Muy Bueno (' + muybueno+ ')' ],
					datasets: [{
//						label: '¿Qué te parece el servicio de comedor?',
						label: pregunta,
//						backgroundColor: 'rgb(122, 233, 142)',
//						borderColor: 'rgb(122, 233, 142)',
						data: [muymalo, malo, regular, bueno, muybueno],
						backgroundColor: [
							window.chartColors.red,
							window.chartColors.orange,
							window.chartColors.yellow,
							window.chartColors.blue,
							window.chartColors.green,
						],
					}]
				},

				options: {
					responsive: true
				}
			});

		});

	}).fail(function (error) {
		console.log(error.responseText);
	});



}(window, jQuery));