(function(document) {
	'use strict';
	var SocketModel = require('./socketModel.js');
	var SocialcastView = require('./components/socialcast.js');

	var ws = new SocketModel({
		url: "ws://localhost:3000"
	});
	var socialcast = new SocialcastView({
		el: document.querySelector('[data-component="socialcast"]'),
		ws: ws
	});
})(document);
