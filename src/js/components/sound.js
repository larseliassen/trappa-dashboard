module.exports = (function() {
	'use strict';
	var Simple = require('../../vendors/simple.js');
	var DialView = require('./dial');

	return Simple.View.extend({
		initialize: function(options) {
			this.ws = options.ws;
			this.ws.on('dec', this.onMessage.bind(this));
			this.dial = new DialView({
				el: this.el.querySelector("svg"),
				maxValue: 140
			});
		},
		onMessage: function(data) {
			this.render(data);
		},
		render: function(value) {
			
			this.dial.update(value/100);
			this.$('.keyfigure-value').innerHTML = value + ' dec';
		}
	});
})();
