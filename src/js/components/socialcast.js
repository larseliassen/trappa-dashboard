module.exports = (function() {
	'use strict';
	var Simple = require('../../vendors/simple.js');
	var speedGraph = require('./speed.svg');
	var d3 = require('d3');

	return Simple.View.extend({
		initialize: function(options) {
			this.ws = options.ws;
			this.ws.on('socialcast', this.onMessage.bind(this));

			this.onMessage({type: 'socialcast', value: 0.75});
		},
		onMessage: function(data) {
			this.render(data.value);
		},
		render: function(value) {
			var svgEl = this.$("svg");
			svgEl.appendChild(speedGraph());
			var el = svgEl;

			var box = {
	            h: el.viewBox.baseVal.height,
	            w: el.viewBox.baseVal.width,
	            top: el.viewBox.baseVal.x,
	            left: el.viewBox.baseVal.y
	        };

	        var svg = this.svg = d3.select(el)
	            .append("g")
	                .attr("transform", "translate(" + ((box.w / 2) + box.top) + "," + ((box.w / 2) + box.left) + ")");

			//this.$('.keyfigure-value').innerHTML = (value * 100) + '%';
		}
	});
})();
