module.exports = (function() {
	'use strict';
	var speedGraph = require('../speed.svg');
	var d3 = require('d3');
	var Simple = require('../../../vendors/simple.js');

	return Simple.View.extend({
		initialize: function(options) {
			

			this.start = 0;
			this.maxValue = options.maxValue || 100 ;
			this.delay = 0;
			this.duration = 1750;

			this.color = options.color || "#df565b";

			this.createDial();
		},

		createDial: function() {
			this.el.appendChild(speedGraph());
			var box = {
				h: this.el.viewBox.baseVal.height,
				w: this.el.viewBox.baseVal.width,
				top: this.el.viewBox.baseVal.x,
				left: this.el.viewBox.baseVal.y
			};

			this.width = box.w;
			this.radius = this.width / 2;

			var svg = this.svg = d3.select(this.el)
				.append("g")
				.attr("transform", "translate(" + ((box.w / 2) + box.top) + "," + ((box.w / 2) + box.left) + ")");

			this.createArc()
			this.createPie();
		},
		createArc: function(options, svg) {
			this.arc = d3.svg.arc()
				.innerRadius(this.radius - 14)
				.outerRadius(this.radius - 14);

			this.arcPath = this.svg.append("path")
				.attr({
					"stroke": this.color,
					"stroke-width": "3.4",
					"transform": "rotate(-90)"
				})
				.datum({ startAngle: this.computeAngle(0), endAngle: this.computeAngle(0) })
				.attr("d", this.arc);
		},
		createPie: function() {
			this.arc2 = d3.svg.arc()
				.innerRadius(0)
				.outerRadius(this.radius - 50);
			var pie = d3.layout.pie()
				.value(function(d) { return d.value});

			this.pie = this.svg.append("svg:path")
				.attr("fill", "#515151")
				.attr("transform", "rotate(-90)")
				.attr("class", "slice")
				.datum({startAngle: this.computeAngle(0), endAngle: this.computeAngle(0) })
				.attr("d", this.arc2);
		},
		computeAngle: function(val) {
			val = Math.min(val, this.maxValue / 100);
			var computeVal = ((val / this.maxValue) * 100 / 2) + this.start;
			var T = 2 * Math.PI;
			return computeVal * T;
		},
		update: function(value) {
			var newAngle = this.computeAngle(value);
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
		}
	})
})();