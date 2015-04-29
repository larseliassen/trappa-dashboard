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
				maxValue: 100,
				color: '#28bcb3'
			});
		},
		onMessage: function(data) {
			this.render(data);
		},
		normaliseValue: function(value) {
			return Math.max(Math.sqrt((value / 2 * Math.sqrt(2))) -5, 0).toFixed(2);
		},
		getDialVaue: function(value) {
			var decMax = Math.sqrt(362) * 2;
			return Math.min(1, Math.max(0, value / decMax)).toFixed(4);
		},
		render: function(value) {
			var val = this.normaliseValue(value);
			var dialvalue = this.getDialVaue(val);
			this.dial.update(dialvalue);
			this.$('.keyfigure-value').innerHTML = val + ' dec';
		}
	});
})();
