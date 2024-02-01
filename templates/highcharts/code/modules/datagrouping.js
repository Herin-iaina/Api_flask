/**
 * Highstock JS v11.2.0 (2023-10-30)
 *
 * Data grouping module
 *
 * (c) 2010-2021 Torstein Hønsi
 *
 * License: www.highcharts.com/license
 */!function(t){"object"==typeof module&&module.exports?(t.default=t,module.exports=t):"function"==typeof define&&define.amd?define("highcharts/modules/datagrouping",["highcharts"],function(i){return t(i),t.Highcharts=i,t}):t("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(t){"use strict";var i=t?t._modules:{};function o(t,i,o,e){t.hasOwnProperty(i)||(t[i]=e.apply(null,o),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:i,module:t[i]}})))}o(i,"Extensions/DataGrouping/ApproximationRegistry.js",[],function(){return{}}),o(i,"Extensions/DataGrouping/ApproximationDefaults.js",[i["Extensions/DataGrouping/ApproximationRegistry.js"],i["Core/Utilities.js"]],function(t,i){let{arrayMax:o,arrayMin:e,correctFloat:a,extend:n,isNumber:s}=i;function r(t){let i=t.length,o=p(t);return s(o)&&i&&(o=a(o/i)),o}function p(t){let i=t.length,o;if(!i&&t.hasNulls)o=null;else if(i)for(o=0;i--;)o+=t[i];return o}let l={average:r,averages:function(){let t=[];return[].forEach.call(arguments,function(i){t.push(r(i))}),void 0===t[0]?void 0:t},close:function(t){return t.length?t[t.length-1]:t.hasNulls?null:void 0},high:function(t){return t.length?o(t):t.hasNulls?null:void 0},hlc:function(i,o,e){if(i=t.high(i),o=t.low(o),e=t.close(e),s(i)||s(o)||s(e))return[i,o,e]},low:function(t){return t.length?e(t):t.hasNulls?null:void 0},ohlc:function(i,o,e,a){if(i=t.open(i),o=t.high(o),e=t.low(e),a=t.close(a),s(i)||s(o)||s(e)||s(a))return[i,o,e,a]},open:function(t){return t.length?t[0]:t.hasNulls?null:void 0},range:function(i,o){return(i=t.low(i),o=t.high(o),s(i)||s(o))?[i,o]:null===i&&null===o?null:void 0},sum:p};return n(t,l),l}),o(i,"Extensions/DataGrouping/DataGroupingDefaults.js",[],function(){return{common:{groupPixelWidth:2,dateTimeLabelFormats:{millisecond:["%A, %e %b, %H:%M:%S.%L","%A, %e %b, %H:%M:%S.%L","-%H:%M:%S.%L"],second:["%A, %e %b, %H:%M:%S","%A, %e %b, %H:%M:%S","-%H:%M:%S"],minute:["%A, %e %b, %H:%M","%A, %e %b, %H:%M","-%H:%M"],hour:["%A, %e %b, %H:%M","%A, %e %b, %H:%M","-%H:%M"],day:["%A, %e %b %Y","%A, %e %b","-%A, %e %b %Y"],week:["Week from %A, %e %b %Y","%A, %e %b","-%A, %e %b %Y"],month:["%B %Y","%B","-%B %Y"],year:["%Y","%Y","-%Y"]}},seriesSpecific:{line:{},spline:{},area:{},areaspline:{},arearange:{},column:{groupPixelWidth:10},columnrange:{groupPixelWidth:10},candlestick:{groupPixelWidth:10},ohlc:{groupPixelWidth:5},hlc:{groupPixelWidth:5},heikinashi:{groupPixelWidth:10}},units:[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1]],["week",[1]],["month",[1,3,6]],["year",null]]}}),o(i,"Extensions/DataGrouping/DataGroupingAxisComposition.js",[i["Extensions/DataGrouping/DataGroupingDefaults.js"],i["Core/Utilities.js"]],function(t,i){let o;let{addEvent:e,extend:a,merge:n,pick:s}=i,r=[];function p(t){let i=this,o=i.series;o.forEach(function(t){t.groupPixelWidth=void 0}),o.forEach(function(o){o.groupPixelWidth=i.getGroupPixelWidth&&i.getGroupPixelWidth(),o.groupPixelWidth&&(o.hasProcessed=!0),o.applyGrouping(!!t.hasExtremesChanged)})}function l(){let i=this.series,o=i.length,e=0,a=!1,n,r;for(;o--;)(r=i[o].options.dataGrouping)&&(e=Math.max(e,s(r.groupPixelWidth,t.common.groupPixelWidth)),n=(i[o].processedXData||i[o].data).length,(i[o].groupPixelWidth||n>this.chart.plotSizeX/e||n&&r.forced)&&(a=!0));return a?e:0}function u(){this.series.forEach(function(t){t.hasProcessed=!1})}function h(t,i){let e;if(i=s(i,!0),t||(t={forced:!1,units:null}),this instanceof o)for(e=this.series.length;e--;)this.series[e].update({dataGrouping:t},!1);else this.chart.options.series.forEach(function(i){i.dataGrouping="boolean"==typeof t?t:n(t,i.dataGrouping)});this.ordinal&&(this.ordinal.slope=void 0),i&&this.chart.redraw()}return{compose:function(t){o=t,i.pushUnique(r,t)&&(e(t,"afterSetScale",u),e(t,"postProcessData",p),a(t.prototype,{applyGrouping:p,getGroupPixelWidth:l,setDataGrouping:h}))}}}),o(i,"Extensions/DataGrouping/DataGroupingSeriesComposition.js",[i["Extensions/DataGrouping/ApproximationRegistry.js"],i["Extensions/DataGrouping/DataGroupingDefaults.js"],i["Core/Axis/DateTimeAxis.js"],i["Core/Defaults.js"],i["Core/Series/SeriesRegistry.js"],i["Core/Utilities.js"]],function(t,i,o,e,a,n){let{series:{prototype:s}}=a,{addEvent:r,defined:p,error:l,extend:u,isNumber:h,merge:g,pick:d}=n,c=s.generatePoints,f=[];function m(t){var e;let a=this.chart,n=this.options,r=n.dataGrouping,u=!1!==this.allowDG&&r&&d(r.enabled,a.options.isStock),g=this.reserveSpace(),c=this.currentDataGrouping,f,m,x=!1;u&&!this.requireSorting&&(this.requireSorting=x=!0);let D=!1==!(this.isCartesian&&!this.isDirty&&!this.xAxis.isDirty&&!this.yAxis.isDirty&&!t)||!u;if(x&&(this.requireSorting=!1),!D){let t,n;this.destroyGroupedData();let u=r.groupAll?this.xData:this.processedXData,x=r.groupAll?this.yData:this.processedYData,D=a.plotSizeX,G=this.xAxis,y=G.options.ordinal,A=this.groupPixelWidth;if(A&&u&&u.length&&D){n=!0,this.isDirty=!0,this.points=null;let c=G.getExtremes(),M=c.min,S=c.max,P=y&&G.ordinal&&G.ordinal.getGroupIntervalFactor(M,S,this)||1,j=A*(S-M)/D*P,E=G.getTimeTicks(o.Additions.prototype.normalizeTimeTickInterval(j,r.units||i.units),Math.min(M,u[0]),Math.max(S,u[u.length-1]),G.options.startOfWeek,u,this.closestPointRange),b=s.groupData.apply(this,[u,x,E,r.approximation]),v=b.groupedXData,C=b.groupedYData,W=0;for(r&&r.smoothed&&v.length&&(r.firstAnchor="firstPoint",r.anchor="middle",r.lastAnchor="lastPoint",l(32,!1,a,{"dataGrouping.smoothed":"use dataGrouping.anchor"})),t=1;t<E.length;t++)E.info.segmentStarts&&-1!==E.info.segmentStarts.indexOf(t)||(W=Math.max(E[t]-E[t-1],W));(f=E.info).gapSize=W,this.closestPointRange=E.info.totalRange,this.groupMap=b.groupMap,this.currentDataGrouping=f,function(t,i,o){let e;let a=t.options,n=a.dataGrouping,s=t.currentDataGrouping&&t.currentDataGrouping.gapSize;if(n&&t.xData&&s&&t.groupMap){let a=i.length-1,r=n.anchor,p=d(n.firstAnchor,r),l=d(n.lastAnchor,r);if(r&&"start"!==r){let t=s*({middle:.5,end:1})[r];for(e=i.length-1;e--&&e>0;)i[e]+=t}if(p&&"start"!==p&&t.xData[0]>=i[0]){let o;let e=t.groupMap[0].start,a=t.groupMap[0].length;h(e)&&h(a)&&(o=e+(a-1)),i[0]=({middle:i[0]+.5*s,end:i[0]+s,firstPoint:t.xData[0],lastPoint:o&&t.xData[o]})[p]}if(l&&"start"!==l&&s&&i[a]>=o-s){let o=t.groupMap[t.groupMap.length-1].start;i[a]=({middle:i[a]+.5*s,end:i[a]+s,firstPoint:o&&t.xData[o],lastPoint:t.xData[t.xData.length-1]})[l]}}}(this,v,S),g&&(p((e=v)[0])&&h(G.min)&&h(G.dataMin)&&e[0]<G.min&&((!p(G.options.min)&&G.min<=G.dataMin||G.min===G.dataMin)&&(G.min=Math.min(e[0],G.min)),G.dataMin=Math.min(e[0],G.dataMin)),p(e[e.length-1])&&h(G.max)&&h(G.dataMax)&&e[e.length-1]>G.max&&((!p(G.options.max)&&h(G.dataMax)&&G.max>=G.dataMax||G.max===G.dataMax)&&(G.max=Math.max(e[e.length-1],G.max)),G.dataMax=Math.max(e[e.length-1],G.dataMax))),r.groupAll&&(this.allGroupedData=C,v=(m=this.cropData(v,C,G.min,G.max)).xData,C=m.yData,this.cropStart=m.start),this.processedXData=v,this.processedYData=C}else this.groupMap=null;this.hasGroupedData=n,this.preventGraphAnimation=(c&&c.totalRange)!==(f&&f.totalRange)}}function x(){this.groupedData&&(this.groupedData.forEach(function(t,i){t&&(this.groupedData[i]=t.destroy?t.destroy():null)},this),this.groupedData.length=0)}function D(){c.apply(this),this.destroyGroupedData(),this.groupedData=this.hasGroupedData?this.points:null}function G(){return this.is("arearange")?"range":this.is("ohlc")?"ohlc":this.is("hlc")?"hlc":this.is("column")||this.options.cumulative?"sum":"average"}function y(i,o,e,a){let n=this,s=n.data,r=n.options&&n.options.data,l=[],u=[],d=[],c=i.length,f=!!o,m=[],x=n.pointArrayMap,D=x&&x.length,G=["x"].concat(x||["y"]),y=this.options.dataGrouping&&this.options.dataGrouping.groupAll,A,M,S,P=0,j=0,E="function"==typeof a?a:a&&t[a]?t[a]:t[n.getDGApproximation&&n.getDGApproximation()||"average"];if(D){let t=x.length;for(;t--;)m.push([])}else m.push([]);let b=D||1;for(let t=0;t<=c;t++)if(!(i[t]<e[0])){for(;void 0!==e[P+1]&&i[t]>=e[P+1]||t===c;){A=e[P],n.dataGroupInfo={start:y?j:n.cropStart+j,length:m[0].length},S=E.apply(n,m),n.pointClass&&!p(n.dataGroupInfo.options)&&(n.dataGroupInfo.options=g(n.pointClass.prototype.optionsToObject.call({series:n},n.options.data[n.cropStart+j])),G.forEach(function(t){delete n.dataGroupInfo.options[t]})),void 0!==S&&(l.push(A),u.push(S),d.push(n.dataGroupInfo)),j=t;for(let t=0;t<b;t++)m[t].length=0,m[t].hasNulls=!1;if(P+=1,t===c)break}if(t===c)break;if(x){let i;let o=n.options.dataGrouping&&n.options.dataGrouping.groupAll?t:n.cropStart+t,e=s&&s[o]||n.pointClass.prototype.applyOptions.apply({series:n},[r[o]]);for(let t=0;t<D;t++)h(i=e[x[t]])?m[t].push(i):null===i&&(m[t].hasNulls=!0)}else h(M=f?o[t]:null)?m[0].push(M):null===M&&(m[0].hasNulls=!0)}return{groupedXData:l,groupedYData:u,groupMap:d}}function A(t){let o=t.options,a=this.type,n=this.chart.options.plotOptions,s=this.useCommonDataGrouping&&i.common,r=i.seriesSpecific,p=e.defaultOptions.plotOptions[a].dataGrouping;if(n&&(r[a]||s)){let t=this.chart.rangeSelector;p||(p=g(i.common,r[a])),o.dataGrouping=g(s,p,n.series&&n.series.dataGrouping,n[a].dataGrouping,this.userOptions.dataGrouping,!o.isInternal&&t&&h(t.selected)&&t.buttonOptions[t.selected].dataGrouping)}}return{compose:function(t){let i=t.prototype.pointClass;n.pushUnique(f,i)&&r(i,"update",function(){if(this.dataGroup)return l(24,!1,this.series.chart),!1}),n.pushUnique(f,t)&&(r(t,"afterSetOptions",A),r(t,"destroy",x),u(t.prototype,{applyGrouping:m,destroyGroupedData:x,generatePoints:D,getDGApproximation:G,groupData:y}))},groupData:y}}),o(i,"Extensions/DataGrouping/DataGrouping.js",[i["Extensions/DataGrouping/DataGroupingAxisComposition.js"],i["Extensions/DataGrouping/DataGroupingDefaults.js"],i["Extensions/DataGrouping/DataGroupingSeriesComposition.js"],i["Core/Templating.js"],i["Core/Utilities.js"]],function(t,i,o,e,a){let{format:n}=e,{addEvent:s,extend:r,isNumber:p}=a,l=[];function u(t){let o=this.chart,e=o.time,a=t.labelConfig,s=a.series,l=s.options,u=s.tooltipOptions,h=l.dataGrouping,g=s.xAxis,d=u.xDateFormat,c,f,m,x,D,G=u[t.isFooter?"footerFormat":"headerFormat"];g&&"datetime"===g.options.type&&h&&p(a.key)&&(f=s.currentDataGrouping,m=h.dateTimeLabelFormats||i.common.dateTimeLabelFormats,f?(x=m[f.unitName],1===f.count?d=x[0]:(d=x[1],c=x[2])):!d&&m&&g.dateTime&&(d=g.dateTime.getXDateFormat(a.x,u.dateTimeLabelFormats)),D=e.dateFormat(d,a.key),c&&(D+=e.dateFormat(c,a.key+f.totalRange-1)),s.chart.styledMode&&(G=this.styledModeFormat(G)),t.text=n(G,{point:r(a.point,{key:D}),series:s},o),t.preventDefault())}let h={compose:function(i,e,n){t.compose(i),o.compose(e),n&&a.pushUnique(l,n)&&s(n,"headerFormatter",u)},groupData:o.groupData};return h}),o(i,"masters/modules/datagrouping.src.js",[i["Core/Globals.js"],i["Extensions/DataGrouping/ApproximationDefaults.js"],i["Extensions/DataGrouping/ApproximationRegistry.js"],i["Extensions/DataGrouping/DataGrouping.js"]],function(t,i,o,e){t.dataGrouping={approximationDefaults:i,approximations:o},e.compose(t.Axis,t.Series,t.Tooltip)})});//# sourceMappingURL=datagrouping.js.map