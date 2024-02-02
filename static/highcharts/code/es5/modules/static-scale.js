/**
 * Highcharts Gantt JS v11.2.0 (2023-10-30)
 *
 * StaticScale
 *
 * (c) 2016-2021 Torstein Honsi, Lars A. V. Cabrera
 *
 * License: www.highcharts.com/license
 */!function(t){"object"==typeof module&&module.exports?(t.default=t,module.exports=t):"function"==typeof define&&define.amd?define("highcharts/modules/static-scale",["highcharts"],function(e){return t(e),t.Highcharts=e,t}):t("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(t){"use strict";var e=t?t._modules:{};function i(t,e,i,a){t.hasOwnProperty(e)||(t[e]=a.apply(null,i),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:e,module:t[e]}})))}i(e,"Extensions/StaticScale.js",[e["Core/Utilities.js"]],function(t){var e=t.addEvent,i=t.defined,a=t.isNumber,s=t.pick,o=t.pushUnique,n=[];function r(){var t=this.chart.options.chart;!this.horiz&&a(this.options.staticScale)&&(!t.height||t.scrollablePlotArea&&t.scrollablePlotArea.minHeight)&&(this.staticScale=this.options.staticScale)}function h(){if("adjustHeight"!==this.redrawTrigger){for(var t=0,e=this.axes||[];t<e.length;t++)!function(t){var e=t.chart,a=!!e.initiatedScale&&e.options.animation,o=t.options.staticScale;if(t.staticScale&&i(t.min)){var n=s(t.brokenAxis&&t.brokenAxis.unitLength,t.max+t.tickInterval-t.min)*o,r=(n=Math.max(n,o))-e.plotHeight;!e.scrollablePixelsY&&Math.abs(r)>=1&&(e.plotHeight=n,e.redrawTrigger="adjustHeight",e.setSize(void 0,e.chartHeight+r,a)),t.series.forEach(function(t){var i=t.sharedClipKey&&e.sharedClips[t.sharedClipKey];i&&i.attr(e.inverted?{width:e.plotHeight}:{height:e.plotHeight})})}}(e[t]);this.initiatedScale=!0}this.redrawTrigger=null}return{compose:function(t,i){if(o(n,t)&&e(t,"afterSetOptions",r),o(n,i)){var a=i.prototype;a.adjustHeight=h,e(i,"render",a.adjustHeight)}}}}),i(e,"masters/modules/static-scale.src.js",[e["Core/Globals.js"],e["Extensions/StaticScale.js"]],function(t,e){e.compose(t.Axis,t.Chart)})});//# sourceMappingURL=static-scale.js.map