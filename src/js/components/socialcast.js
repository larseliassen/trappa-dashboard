module.exports = (function() {
	'use strict';
	var Simple = require('../../vendors/simple.js');
	
	var DialView = require('./dial');

	return Simple.View.extend({
		initialize: function(options) {
			this.ws = options.ws;
			this.ws.on('socialcast', this.onMessage.bind(this));

			this.render(0);

			this.dial = new DialView({
				el: this.el.querySelector("svg")
			});
		},
		onMessage: function(data) {
			this.update(data);
		},
		calculateNumber: function(value) {
			return (Math.log(value * 8)) * 3 || 0;
		},
		update: function(length) {
			var value = this.calculateNumber(length);

			this.$('.keyfigure-value').innerHTML = Math.round(value) + '%';
			this.dial.update(value/100);
		},
		render: function(length) {
			var value = this.calculateNumber(length);
			this.$('.keyfigure-value').innerHTML = Math.round(value) + '%';
		}
		
		
	});
})();
