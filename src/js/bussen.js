module.exports = (function() {
	'use strict';
	var Simple = require('../../vendors/simple.js');
	
	var DialView = require('./dial');

	return Simple.View.extend({
		initialize: function(options) {
			this.ws = options.ws;
			this.ws.on('departure', this.onMessage.bind(this));
			this.maxValue = 30;
			this.render(0);

			this.dial = new DialView({
				el: this.el.querySelector("svg")
			});
		},
		onMessage: function(data) {
			this.update(data);
		},
		calculateNumber: function(value) {
			return Math.max(0, Math.min(1, value / this.maxValue));
		},
		update: function(length) {
			var value = this.calculateNumber(length);

			this.$('.keyfigure-value').innerHTML = Math.round(length) + ' minutter';
			this.dial.update(value);
		},
		render: function(length) {
			var value = this.calculateNumber(length);
			this.$('.keyfigure-value').innerHTML = Math.round(value) + ' minutter';
		}
		
		
	});
})();
