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


			this.redraw = _.throttle(this.draw.bind(this), 1000);
		},
		draw: function() {
			if (this.inst) {
				this.inst.redraw();
			}
		},
		onLoad: function() {
			this.inst = Processing.getInstanceById("waves");
		},
		onDectMessage: function(value) {
			if (this.inst) {
				var o = value / 100;
				this.inst.setDec(o);
				console.log(o);
				this.redraw();
			}
		},
		onDistMessage: function(value) {
			
			if (this.inst) {
				var o = value / 1000;
				this.inst.setDistance(o);
				this.redraw();
			}
		},
		onMessage: function(value) {
			if (this.inst) {
				var o = this.calculateNumber(value) / 100;
				this.inst.setSocialcast(o);
				this.redraw();
			}
		},
		calculateNumber: function(value) {
			return (Math.log(value * 8)) * 3 || 0;
		},
	});
})();