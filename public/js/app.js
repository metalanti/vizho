$(function() {

	Highcharts.setOptions({
		global: {
			useUTC: false
		}
	});

	$.getJSON('/data', function(resp) {
		if (resp && resp.length > 0) {
			var utolso = resp[resp.length - 1];
			$('#utolso').html('<small>' + moment(utolso.date).format('YYYY-MM-DD HH:mm') + '</small> ' + utolso.temp + ' °C');
		}
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
