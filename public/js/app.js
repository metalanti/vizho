$(function() {

	Highcharts.setOptions({
		global: {
			useUTC: false
		}
	});

	$.getJSON('/data', function(resp) {
		data = resp.map(function(r) {
			return [r.date, r.temp];
		});
		Highcharts.stockChart('chart', {

			title: {
				text: 'Pécsi tó °C'
			},

			series: [{
				name: 'Pécsi tó',
				data: data,
				tooltip: {
					valueDecimals: 1
				}
			}]
		});
	});
});
