module.exports = (function() {
	'use strict';
	var Simple = require('../../../vendors/simple.js');
	var speedGraph = require('../speed.svg');
	var d3 = require('d3');

	return Simple.View.extend({
		initialize: function(options) {
			this.ws = options.ws;
			this.ws.on('socialcast', this.onMessage.bind(this));

			//this.onMessage({type: 'socialcast', value: 0.75});
			this.render(0);
		},
		onMessage: function(data) {
			this.update(data);
		},
		calculateNumber: function(value) {
			return (Math.log(value));
		},
		update: function(length) {
			var value = this.calculateNumber(length);

			this.$('.keyfigure-value').innerHTML = Math.round(value) + '%';
			this.updateValue(value);
		},
		render: function(length) {
			
			var value = this.calculateNumber(length);
			this.width = this.el.style.width;
			var svgEl = this.el.querySelector("svg");
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

			this.$('.keyfigure-value').innerHTML = Math.round(value) + '%';

			this.createArc({
				box: box,
				value: value
			}, svg);

			this.addPie(value);
		},
		createArc: function(options, svg) {
			this.start = 1;
			this.maxValue = 100;
			this.delay = 0;
			this.duration = 1750;

			this.width = options.box.w;
			this.height = options.box.h;
			this.radius = this.width / 2;

			this.arc = d3.svg.arc()
				.innerRadius(this.radius - 14)
				.outerRadius(this.radius - 14);

			this.arcPath = svg.append("path")
			.attr({
				"stroke": "#df565b",
				"stroke-width": "3.4"
			})
			.datum({ startAngle: this.computeAngle(0), endAngle: this.computeAngle(0.0) })
			.attr("d", this.arc);
		},
		addPie: function(value) {

			this.arc2 = d3.svg.arc()
				.innerRadius(0)
				.outerRadius(this.radius - 20);
			var pie = d3.layout.pie()
				.value(function(d) { return d.value});

			this.pie = this.svg.append("svg:path")
				.attr("fill", "#515151")
				.attr("class", "slice")
				.datum({startAngle: this.computeAngle(0), endAngle: this.computeAngle(0) })
				.attr("d", this.arc2);


		},
		computeAngle: function(val) {
			val = Math.min(val, this.maxValue / 100) - 0.5;
			var computeVal = ((val / this.maxValue) * 100 / 2) + this.start;
			var T = 2 * Math.PI;
			return computeVal * T;
		},
		updateValue: function (val) {

			var newAngle = this.computeAngle(val/100);
			var arc = this.arc;
			var arc2 = this.arc2;

			this.arcPath.transition()
			.ease("exp-out")
			.delay(this.delay)
			.duration(this.duration)
			.attrTween("d", function(d) {
				var interpolate = d3.interpolate(d.endAngle, newAngle);
				return function(t) {
					d.endAngle = interpolate(t);
					return arc(d);
				};
			});

			this.pie.transition().ease("exp-out")
				.delay(this.delay)
				.duration(this.duration)
				.attrTween("d", function(d) {
					var interpolate = d3.interpolate(d.endAngle, newAngle);
					return function(t) {
						d.endAngle = interpolate(t);
						return arc2(d);
					};
				});
		},
	});
})();
