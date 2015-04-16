module.exports = (function() {
	'use strict';
	var Simple = require('../../vendors/simple.js');
	var speedGraph = require('./speed.svg');
	var d3 = require('d3');

	return Simple.View.extend({
		initialize: function(options) {
			this.ws = options.ws;
			this.ws.on('dist', this.onMessage.bind(this));
		},
		onMessage: function(data) {
			this.render(data);
		},
		normaliseNumber: function(value) {
			return value / 100;
		},
		getLineVal: function(value) {
			var max = 2.8;
			return Math.min(100, value / max * 100);
		},
		render: function(value) {
			var line = this.$('.keyfigure-bar--line');
			var p = this.normaliseNumber(value);
			line.style.left = this.getLineVal(p) + "%";
			if (p > 2.8) {
				p = "∞";
			}
			this.$('.keyfigure-value').innerHTML = p + ' m';
		}
	});
})();
