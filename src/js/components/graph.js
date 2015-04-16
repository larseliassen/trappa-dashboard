module.exports = (function() {
	'use strict';
	var Simple = require('../../vendors/simple.js');
	var _ = require('lodash');
	//var Processing = require('../../vendors/processing.min.js');

	return Simple.View.extend({
		initialize: function(options) {
			window.setTimeout(this.onLoad.bind(this), 1000)
			//this.el.addEventListener('load', this.onLoad.bind(this));
			this.inst = Processing.getInstanceById("waves");
			this.ws = options.ws;
			this.ws2 = options.ws2;

			this.ws.on('socialcast', this.onMessage.bind(this));
			this.ws2.on('dist', this.onDistMessage.bind(this));
			this.ws2.on('dec', this.onDectMessage.bind(this));


			this.redraw = _.throttle(this.draw.bind(this), 100);
		},
		draw: function() {
			if (this.inst) {
				this.inst.redraw();
			}
		},
		onLoad: function() {
			this.inst = Processing.getInstanceById("waves");
		},
		normaliseValue: function(value) {
			return Math.sqrt((value / 2 * Math.sqrt(2))).toFixed(2);
		},
		getDialVaue: function(value) {
			var decMax = Math.sqrt(362);
			return Math.min(1, Math.max(0, value / decMax));
		},
		onDectMessage: function(value) {
			if (this.inst) {
				var o = this.getDialVaue(this.normaliseValue(value));
				this.inst.setDec(o);
				this.redraw();
			}
		},
		onDistMessage: function(value) {
			
			if (this.inst) {
				if (value > 280) {
					value = 0;
				}
				var o = Math.max(0, Math.min(1, value / 280));
				this.inst.setDistance(o);
				this.redraw();
			}
		},
		onMessage: function(value) {
			if (this.inst) {
				var o = this.calculateNumber(value);
				this.inst.setSocialcast(o);
				this.redraw();
			}
		},
		calculateNumber: function(value) {
			return Math.max(0, Math.min(1, value / 30));
		},
	});
})();