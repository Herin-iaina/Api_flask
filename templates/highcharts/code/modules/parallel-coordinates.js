/**
 * Highcharts JS v11.2.0 (2023-10-30)
 *
 * Support for parallel coordinates in Highcharts
 *
 * (c) 2010-2021 Pawel Fus
 *
 * License: www.highcharts.com/license
 */!function(t){"object"==typeof module&&module.exports?(t.default=t,module.exports=t):"function"==typeof define&&define.amd?define("highcharts/modules/parallel-coordinates",["highcharts"],function(e){return t(e),t.Highcharts=e,t}):t("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(t){"use strict";var e=t?t._modules:{};function s(t,e,s,i){t.hasOwnProperty(e)||(t[e]=i.apply(null,s),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:e,module:t[e]}})))}s(e,"Extensions/ParallelCoordinates/ParallelCoordinatesDefaults.js",[],function(){return{chart:{parallelCoordinates:!1,parallelAxes:{lineWidth:1,title:{text:"",reserveSpace:!1},labels:{x:0,y:4,align:"center",reserveSpace:!1},offset:0}},xAxis:{lineWidth:0,tickLength:0,opposite:!0,type:"category"}}}),s(e,"Extensions/ParallelCoordinates/ParallelAxis.js",[e["Extensions/ParallelCoordinates/ParallelCoordinatesDefaults.js"],e["Core/Utilities.js"]],function(t,e){var s;let{addEvent:i,arrayMax:l,arrayMin:o,isNumber:a,merge:r,pick:n,pushUnique:h,splat:p}=e;class c{constructor(t){this.axis=t}setPosition(t,e){let s=this.axis,i=s.chart,l=((this.position||0)+.5)/(i.parallelInfo.counter+1);i.polar?e.angle=360*l:(e[t[0]]=100*l+"%",s[t[1]]=e[t[1]]=0,s[t[2]]=e[t[2]]=null,s[t[3]]=e[t[3]]=null)}}return function(e){let s=[];function d(e){let s=this.chart,i=this.parallelCoordinates,l=["left","width","height","top"];if(s.hasParallelCoordinates){if(s.inverted&&(l=l.reverse()),this.isXAxis)this.options=r(this.options,t.xAxis,e.userOptions);else{let t=s.yAxis.indexOf(this);this.options=r(this.options,this.chart.options.chart.parallelAxes,e.userOptions),i.position=n(i.position,t>=0?t:s.yAxis.length),i.setPosition(l,this.options)}}}function f(t){let e=this.chart,s=this.parallelCoordinates;if(s&&e&&e.hasParallelCoordinates&&!this.isXAxis){let e=s.position,i=[];this.series.forEach(function(t){if(t.yData&&t.visible&&a(e)){let s=t.yData[e];i.push.apply(i,p(s))}}),i=i.filter(a),this.dataMin=o(i),this.dataMax=l(i),t.preventDefault()}}function u(){this.parallelCoordinates||(this.parallelCoordinates=new c(this))}e.compose=function(t){h(s,t)&&(t.keepProps.push("parallel"),i(t,"init",u),i(t,"afterSetOptions",d),i(t,"getSeriesExtremes",f))}}(s||(s={})),s}),s(e,"Extensions/ParallelCoordinates/ParallelSeries.js",[e["Core/Templating.js"],e["Core/Utilities.js"]],function(t,e){var s;let{format:i}=t,{addEvent:l,defined:o,erase:a,extend:r,insertItem:n,isNumber:h,pick:p,pushUnique:c,wrap:d}=e;return function(t){let e=[];function s(){let t=this.chart,e=this.points,s=e&&e.length,i=Number.MAX_VALUE,l,a;if(this.chart.hasParallelCoordinates){for(let r=0;r<s;r++)o((a=e[r]).y)?(t.polar?a.plotX=t.yAxis[r].angleRad||0:t.inverted?a.plotX=t.plotHeight-t.yAxis[r].top+t.plotTop:a.plotX=t.yAxis[r].left-t.plotLeft,a.clientX=a.plotX,a.plotY=t.yAxis[r].translate(a.y,!1,!0,void 0,!0),h(a.high)&&(a.plotHigh=t.yAxis[r].translate(a.high,!1,!0,void 0,!0)),void 0!==l&&(i=Math.min(i,Math.abs(a.plotX-l))),l=a.plotX,a.isInside=t.isInsidePlot(a.plotX,a.plotY,{inverted:t.inverted})):a.isNull=!0;this.closestPointRangePx=i}}function f(t){let e=this.chart;if(e.hasParallelCoordinates){for(let t of e.axes)n(this,t.series),t.isDirty=!0;this.xAxis=e.xAxis[0],this.yAxis=e.yAxis[0],t.preventDefault()}}function u(){let t=this.chart;if(t.hasParallelCoordinates)for(let e of t.axes||[])e&&e.series&&(a(e.series,this),e.isDirty=e.forceRedraw=!0)}function x(t){let e,s,l,a;let n=this.series&&this.series.chart,h=t.apply(this,[].slice.call(arguments,1));return n&&n.hasParallelCoordinates&&!o(h.formattedValue)&&(e=(l=p((s=(a=n.yAxis[this.x]).options).tooltipValueFormat,s.labels.format))?i(l,r(this,{value:this.y}),n):a.dateTime?n.time.dateFormat(n.time.resolveDTLFormat(s.dateTimeLabelFormats[a.tickPositions.info.unitName]).main,this.y):s.categories?s.categories[this.y]:this.y,h.formattedValue=h.point.formattedValue=e),h}t.compose=function(t){let{line:{prototype:{pointClass:i}},spline:{prototype:{pointClass:o}}}=t.types;if(i&&c(e,i)){let t=i.prototype;d(t,"getLabelConfig",x)}if(c(e,t)&&(l(t,"afterTranslate",s,{order:1}),l(t,"bindAxes",f),l(t,"destroy",u)),o&&c(e,o)){let t=o.prototype;d(t,"getLabelConfig",x)}}}(s||(s={})),s}),s(e,"Extensions/ParallelCoordinates/ParallelCoordinates.js",[e["Extensions/ParallelCoordinates/ParallelAxis.js"],e["Extensions/ParallelCoordinates/ParallelCoordinatesDefaults.js"],e["Extensions/ParallelCoordinates/ParallelSeries.js"],e["Core/Utilities.js"]],function(t,e,s,i){var l;let{addEvent:o,defined:a,merge:r,pushUnique:n,splat:h}=i;class p{constructor(t){this.chart=t}setParallelInfo(t){let e=this.chart||this,s=t.series;for(let t of(e.parallelInfo={counter:0},s))t.data&&(e.parallelInfo.counter=Math.max(e.parallelInfo.counter,t.data.length-1))}}return function(i){let l=[];function c(t){let s=t.args[0],i=h(s.yAxis||{}),l=[],o=i.length;if(this.hasParallelCoordinates=s.chart&&s.chart.parallelCoordinates,this.hasParallelCoordinates){for(this.setParallelInfo(s);o<=this.parallelInfo.counter;o++)l.push({});s.legend||(s.legend={}),void 0===s.legend.enabled&&(s.legend.enabled=!1),r(!0,s,{boost:{seriesThreshold:Number.MAX_VALUE},plotOptions:{series:{boostThreshold:Number.MAX_VALUE}}}),s.yAxis=i.concat(l),s.xAxis=r(e.xAxis,h(s.xAxis||{})[0])}}function d(t){let e=t.options;if(e.chart&&(a(e.chart.parallelCoordinates)&&(this.hasParallelCoordinates=e.chart.parallelCoordinates),this.options.chart.parallelAxes=r(this.options.chart.parallelAxes,e.chart.parallelAxes)),this.hasParallelCoordinates)for(let t of(e.series&&this.setParallelInfo(e),this.yAxis))t.update({},!1)}i.compose=function(i,a,h,f){if(t.compose(i),s.compose(f),n(l,a)){let t=p.prototype,e=a.prototype;e.setParallelInfo=t.setParallelInfo,o(a,"init",c),o(a,"update",d)}n(l,h)&&r(!0,h.chart,e.chart)}}(l||(l={})),l}),s(e,"masters/modules/parallel-coordinates.src.js",[e["Core/Globals.js"],e["Extensions/ParallelCoordinates/ParallelCoordinates.js"]],function(t,e){e.compose(t.Axis,t.Chart,t.defaultOptions,t.Series)})});//# sourceMappingURL=parallel-coordinates.js.map