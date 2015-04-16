module.exports = (function() {
	'use strict';
	var Simple = require('../vendors/simple.js');

	return Simple.Model.extend({
		initialize: function(options) {
			this.url = options.url;
			this.ws = new WebSocket(this.url);
			this.ws.onmessage = this.onMessage.bind(this);
			this.ws.onerror = this.onError.bind(this);
		},
		onMessage: function(event) {
			var data = JSON.parse(event.data);
			if (data) {
				var type = data.type;
				this.trigger(type, data);
			}
		},
		onError: function(event) {
			console.log(event);
		}
	});
})();