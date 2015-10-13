(function(document) {
	'use strict';
	var SocketModel = require('./socketModel.js');
	var SocialcastView = require('./components/socialcast.js');
	var BussenView = require('./components/bussen.js');
	var SoundView = require('./components/sound.js');
	var DistanceView = require('./components/distance.js');
	var GraphView = require('./components/graph.js');


	var ws = new SocketModel({
		url: "ws://localhost:8013"
	});


	var ws2 = new SocketModel({
		url: "ws://10.0.20.158:5000"
	});

	var bussen = new BussenView({
		el: document.querySelector('[data-component="bussen"]'),
		ws: ws
	});

	var socialcast = new SocialcastView({
		el: document.querySelector('[data-component="socialcast"]'),
		ws: ws
	});
	var sound = new SoundView({
		el: document.querySelector('[data-component="sound"]'),
		ws: ws2
	});
	var distance = new DistanceView({
		el: document.querySelector('[data-component="distance"]'),
		ws: ws2
	});

	var grap = new GraphView({
		el: document.querySelector('#waves'),
		ws: ws,
		ws2: ws2
	});
})(document);
