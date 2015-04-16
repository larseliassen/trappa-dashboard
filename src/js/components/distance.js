module.exports = (function() {
	'use strict';
	var Simple = require('../../vendors/simple.js');
	var speedGraph = require('./speed.svg');
	var d3 = require('d3');

	return Simple.View.extend({
		initialize: function(options) {
			this.ws = options.ws;
			this.ws.on('dist', this.onMessage.bind(this));

			//this.onMessage({type: 'socialcast', value: 0.75});
		},
		onMessage: function(data) {
			this.render(data);
		},
		render: function(value) {
			var line = this.$('.keyfigure-bar--line');
			var p = value / 10;
			line.style.left = p + "%";

			this.$('.keyfigure-value').innerHTML = value + ' m';
		}
	});
})();
