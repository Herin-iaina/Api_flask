/**
 * Highcharts JS v11.2.0 (2023-10-30)
 *
 * Highcharts funnel module
 *
 * (c) 2010-2021 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */!function(t){"object"==typeof module&&module.exports?(t.default=t,module.exports=t):"function"==typeof define&&define.amd?define("highcharts/modules/funnel",["highcharts"],function(e){return t(e),t.Highcharts=e,t}):t("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(t){"use strict";var e=t?t._modules:{};function i(t,e,i,n){t.hasOwnProperty(e)||(t[e]=n.apply(null,i),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:e,module:t[e]}})))}i(e,"Series/Funnel/FunnelSeriesDefaults.js",[],function(){return{animation:!1,borderRadius:0,center:["50%","50%"],width:"90%",neckWidth:"30%",height:"100%",neckHeight:"25%",reversed:!1,size:!0,dataLabels:{connectorWidth:1,verticalAlign:"middle"},states:{select:{color:"#cccccc",borderColor:"#000000"}}}}),i(e,"Series/Funnel/FunnelSeries.js",[e["Series/Funnel/FunnelSeriesDefaults.js"],e["Core/Globals.js"],e["Extensions/BorderRadius.js"],e["Core/Series/SeriesRegistry.js"],e["Core/Utilities.js"]],function(t,e,i,n,o){var r,a=this&&this.__extends||(r=function(t,e){return(r=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw TypeError("Class extends value "+String(e)+" is not a constructor or null");function i(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}),s=e.noop,d=n.seriesTypes,l=d.column,u=d.pie,p=o.addEvent,h=o.extend,c=o.fireEvent,f=o.isArray,y=o.merge,g=o.pick,v=o.pushUnique,x=o.relativeLength,b=o.splat,m=n.series.prototype.alignDataLabel;function L(t,e){return/%$/.test(t)?e*parseInt(t,10)/100:parseInt(t,10)}var S=function(e){function n(){var t=null!==e&&e.apply(this,arguments)||this;return t.data=void 0,t.options=void 0,t.points=void 0,t}return a(n,e),n.prototype.alignDataLabel=function(t,e,i,n,o){var r=t.series,a=r.options.reversed,s=t.dlBox||t.shapeArgs,d=i.align,l=i.verticalAlign,u=((r.options||{}).dataLabels||{}).inside,p=r.center[1],h=a?2*p-t.plotY:t.plotY,c=r.getWidthAt(h-s.height/2+e.height),f="middle"===l?(s.topWidth-s.bottomWidth)/4:(c-s.bottomWidth)/2,y=s.y,v=s.x,x=g(e.height,e.getBBox().height);"middle"===l?y=s.y-s.height/2+x/2:"top"===l&&(y=s.y-s.height+x+(i.padding||0)),("top"===l&&!a||"bottom"===l&&a||"middle"===l)&&("right"===d?v=s.x-i.padding+f:"left"===d&&(v=s.x+i.padding-f)),n={x:v,y:a?y-s.height:y,width:s.bottomWidth,height:s.height},i.verticalAlign="bottom",(!u||t.visible)&&m.call(r,t,e,i,n,o),u&&(!t.visible&&t.dataLabel&&(t.dataLabel.placed=!1),t.contrastColor&&e.css({color:t.contrastColor}))},n.prototype.drawDataLabels=function(){(b(this.options.dataLabels)[0].inside?l:u).prototype.drawDataLabels.call(this)},n.prototype.getDataLabelPosition=function(t,e){var i=t.plotY||0,n=t.half?1:-1,o=this.getX(i,!!t.half,t);return{distance:e,natural:{x:0,y:i},computed:{},alignment:t.half?"right":"left",connectorPosition:{breakAt:{x:o+(e-5)*n,y:i},touchingSliceAt:{x:o+e*n,y:i}}}},n.prototype.translate=function(){var t,e,n,o,r,a,d,l,u,p,h,f,y=this,v=y.chart,b=y.options,m=b.reversed,S=b.ignoreHiddenPoint,j=i.optionsToObject(b.borderRadius),C=v.plotWidth,P=v.plotHeight,_=b.center,M=L(_[0],C),A=L(_[1],P),O=L(b.width,C),W=L(b.height,P),w=L(b.neckWidth,C),k=L(b.neckHeight,P),D=A-W/2+W-k,F=y.data,H=x(j.radius,O),E=j.scope,T="left"===b.dataLabels.position?1:0,I=function(t){var e=Math.tan(t/2),i=Math.cos(o),n=Math.sin(o),a=H,s=a/e,d=Math.tan((Math.PI-t)/3.2104);return s>r&&(a=(s=r)*e),{dx:[s*i,(s-(d*=a))*i,s-d,s],dy:[s*n,(s-d)*n,s-d,s].map(function(t){return m?-t:t})}},Y=0,B=0;y.getWidthAt=function(t){var e=A-W/2;return t>D||W===k?w:w+(O-w)*(1-(t-e)/(W-k))},y.getX=function(t,e,i){var n,o,r,a;return M+(e?-1:1)*(y.getWidthAt(m?2*A-t:t)/2+(null!==(r=null===(o=null===(n=i.dataLabel)||void 0===n?void 0:n.dataLabelPosition)||void 0===o?void 0:o.distance)&&void 0!==r?r:x((null===(a=this.options.dataLabels)||void 0===a?void 0:a.distance)||0,O)))},y.center=[M,A,W],y.centerX=M;for(var R=0;R<F.length;R++){var X=F[R];X.y&&X.isValid()&&(!S||!1!==X.visible)&&(Y+=X.y)}for(var U=0;U<F.length;U++){var X=F[U];if(f=null,n=Y?X.y/Y:0,p=(d=A-W/2+B*W)+n*W,l=(a=M-(t=y.getWidthAt(d))/2)+t,h=(u=M-(t=y.getWidthAt(p))/2)+t,d>D?(a=u=M-w/2,l=h=M+w/2):p>D&&(f=p,h=(u=M-(t=y.getWidthAt(D))/2)+t,p=D),m&&(d=2*A-d,p=2*A-p,null!==f&&(f=2*A-f)),H&&("point"===E||0===X.index||X.index===F.length-1||null!==f)){var q=Math.abs(p-d),G=l-h,N=h-u,V=Math.sqrt(G*G+q*q);o=Math.atan(q/G),r=V/2,null!==f&&(r=Math.min(r,Math.abs(f-p)/2)),N>=1&&(r=Math.min(r,N/2));var z=I(o);if(e="stack"===E&&0!==X.index?[["M",a,d],["L",l,d]]:[["M",a+z.dx[0],d+z.dy[0]],["C",a+z.dx[1],d+z.dy[1],a+z.dx[2],d,a+z.dx[3],d],["L",l-z.dx[3],d],["C",l-z.dx[2],d,l-z.dx[1],d+z.dy[1],l-z.dx[0],d+z.dy[0]]],null!==f){var Z=I(Math.PI/2);z=I(Math.PI/2+o),e.push(["L",h+z.dx[0],p-z.dy[0]],["C",h+z.dx[1],p-z.dy[1],h,p+z.dy[2],h,p+z.dy[3]]),"stack"===E&&X.index!==F.length-1?e.push(["L",h,f],["L",u,f]):e.push(["L",h,f-Z.dy[3]],["C",h,f-Z.dy[2],h-Z.dx[2],f,h-Z.dx[3],f],["L",u+Z.dx[3],f],["C",u+Z.dx[2],f,u,f-Z.dy[2],u,f-Z.dy[3]]),e.push(["L",u,p+z.dy[3]],["C",u,p+z.dy[2],u-z.dx[1],p-z.dy[1],u-z.dx[0],p-z.dy[0]])}else N>=1?(z=I(Math.PI-o),"stack"===E&&0===X.index?e.push(["L",h,p],["L",u,p]):e.push(["L",h+z.dx[0],p-z.dy[0]],["C",h+z.dx[1],p-z.dy[1],h-z.dx[2],p,h-z.dx[3],p],["L",u+z.dx[3],p],["C",u+z.dx[2],p,u-z.dx[1],p-z.dy[1],u-z.dx[0],p-z.dy[0]])):(z=I(Math.PI-2*o),e.push(["L",u+z.dx[0],p-z.dy[0]],["C",u+z.dx[1],p-z.dy[1],u-z.dx[1],p-z.dy[1],u-z.dx[0],p-z.dy[0]]))}else e=[["M",a,d],["L",l,d],["L",h,p]],null!==f&&e.push(["L",h,f],["L",u,f]),e.push(["L",u,p]);e.push(["Z"]),X.shapeType="path",X.shapeArgs={d:e},X.percentage=100*n,X.plotX=M,X.plotY=(d+(f||p))/2,X.tooltipPos=[M,X.plotY],X.dlBox={x:u,y:d,topWidth:l-a,bottomWidth:h-u,height:Math.abs(g(f,p)-d),width:NaN},X.slice=s,X.half=T,X.isValid()&&(!S||!1!==X.visible)&&(B+=n)}c(y,"afterTranslate")},n.prototype.sortByAngle=function(t){t.sort(function(t,e){return t.plotY-e.plotY})},n.defaultOptions=y(u.defaultOptions,t),n}(u);return h(S.prototype,{animate:s}),function(t){var e=[];function i(){for(var t=0,e=this.series;t<e.length;t++){var i=e[t],n=i.options&&i.options.dataLabels;f(n)&&(n=n[0]),i.is("pie")&&i.placeDataLabels&&n&&!n.inside&&i.placeDataLabels()}}t.compose=function(t){v(e,t)&&p(t,"afterHideAllOverlappingLabels",i)}}(S||(S={})),n.registerSeriesType("funnel",S),S}),i(e,"Series/Pyramid/PyramidSeriesDefaults.js",[],function(){return{neckWidth:"0%",neckHeight:"0%",reversed:!0}}),i(e,"Series/Pyramid/PyramidSeries.js",[e["Series/Funnel/FunnelSeries.js"],e["Series/Pyramid/PyramidSeriesDefaults.js"],e["Core/Series/SeriesRegistry.js"],e["Core/Utilities.js"]],function(t,e,i,n){var o,r=this&&this.__extends||(o=function(t,e){return(o=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw TypeError("Class extends value "+String(e)+" is not a constructor or null");function i(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}),a=n.merge,s=function(i){function n(){var t=null!==i&&i.apply(this,arguments)||this;return t.data=void 0,t.options=void 0,t.points=void 0,t}return r(n,i),n.defaultOptions=a(t.defaultOptions,e),n}(t);return i.registerSeriesType("pyramid",s),s}),i(e,"masters/modules/funnel.src.js",[e["Core/Globals.js"],e["Series/Funnel/FunnelSeries.js"]],function(t,e){e.compose(t.Chart)})});//# sourceMappingURL=funnel.js.map