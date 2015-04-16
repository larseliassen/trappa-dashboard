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
				for (var key in data) {
					this.trigger(key, data[key]);
				}
			}
		},
		onError: function(event) {
			this.trigger('socialcast', {value: 0.71});
			this.trigger('dec', {value: 0.45});
			this.trigger('dist', {value: 3.5});
		}
	});
})();