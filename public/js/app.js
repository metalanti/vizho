$(function() {

	Highcharts.setOptions({
		global: {
			useUTC: false
		}
	});

	$.getJSON('/data', function(resp) {
		data = resp || [];
		if (data.length > 0) {
			var utolso = data[data.length - 1];
			$('#utolso').html('<small>' + moment(utolso.date).format('YYYY-MM-DD HH:mm') + '</small> ' + utolso.temp + ' °C');
		}
		var elozo;
		for (var i in data) {
			if (elozo && (elozo.date + 3600000) < data[i].date) {
				for (var d = elozo.date; d < data[i].date; d += 3600000) {
					data.push({
						date: d,
						temp: null
					});
				}
			}
			elozo = data[i];
		}
		data.sort(function(a, b) {
			return a.date - b.date;
		});
		data = data.map(function(d) {
			return [d.date, d.temp];
		});

		Highcharts.stockChart('chart', {

			title: {
				text: 'Pécsi tó °C'
			},

			rangeSelector: {
				buttons: [{
					type: 'day',
					count: 1,
					text: '1d'
				}, {
					type: 'day',
					count: 3,
					text: '3d'
				}, {
					type: 'week',
					count: 1,
					text: '1w'
				}, {
					type: 'week',
					count: 2,
					text: '2w'
				}, {
					type: 'month',
					count: 1,
					text: '1m'
				}, {
					type: 'all',
					text: 'All'
				}]
			},

			series: [{
				name: 'Pécsi tó',
				data: data,
				pointInterval: 3600000,
				tooltip: {
					valueDecimals: 1,
					valueSuffix: '°C'
				}
			}]
		});
	});
});
