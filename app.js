var express = require('express'),
	app = express(),
	favicon = require('serve-favicon'),
	low = require('lowdb'),
	db = low('db.json'),
	path = require('path');

db.defaults({
	vizho: []
}).write();

app.use('/public', express.static('public'));
app.use('/vendor', express.static('bower_components'));
//app.use(favicon(__dirname + '/public/favicon/favicon.ico'));

app.get('/refresh', function(req, res) {
	var url = 'http://www.vizugy.hu/?mapModule=OpGrafikon&AllomasVOA=164962B8-97AB-11D4-BB62-00508BA24287&mapData=Idosor';
	require('jsdom/lib/old-api.js').env(url, function (err, window) {
		if (err) {
			console.error(err);
			return;
		}
		var $ = require('jquery')(window),
			tds,
			datum,
			fok,
			td3,
			vizho,
			vizhok = db.get('vizho');

		$('.vizmercelista').first().find('tr').each(function() {
			tds = $(this).find('td');
			datum = new Date($(tds[0]).text()).valueOf();
			td3 = $(tds[3]).text();
			fok = Number(td3);
			
			if (td3 != '' && !isNaN(fok) && !isNaN(datum)) {
				vizho = vizhok.find({
					date: datum
				}).value();
				
				if (vizho) {
					return;
				}
				vizhok.push({
					date: datum,
					temp: fok
				}).write();
			}
		});
		window.close();
	});
	res.end();
});

app.get('/', function(req, res) {
	return res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/data', function(req, res) {
	return res.json(db.get('vizho').sortBy('date').value());
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log('App listening on port ' + port + '!');
});
