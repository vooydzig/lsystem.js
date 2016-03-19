define("utils",[],function(){function t(t){return t/180*Math.PI}function n(t){return t/Math.PI*180}return{degToRad:t,radToDeg:n}}),define("turtle",["jquery","utils"],function(t,n){function i(n,i){this.canvas=n[0],this.canvasCtx=this.canvas.getContext("2d"),this._initialize(t.extend({},s,i||{}))}var s={lineLength:20,lineWidth:1,rotation:90,color:{r:0,g:0,b:0,a:1}};return function(){function t(t){t.translate(t.canvas.width/2,t.canvas.height/2),t.transform(1,0,0,-1,0,0)}function e(t){t.save(),t.setTransform(1,0,0,1,0,0),t.clearRect(0,0,t.canvas.width,t.canvas.height),t.restore()}function o(t,n,i){t.canvasCtx.moveTo(n,i),t.position.x=a(t,n),t.position.y=r(t,i),t.canvasCtx.lineTo(t.position.x,t.position.y)}function a(t,n){return n+Math.sin(t.angle)*t.lineLength}function r(t,n){return n+Math.cos(t.angle)*t.lineLength}i.prototype._initialize=function(t){this.position={x:0,y:0},this.penDown=!0,this.angle=0,this.updateDrawingParameters(t),this.canvasCtx.lineWidth=this.lineWidth,this.canvasCtx.strokeStyle="black",this.canvasCtx.globalAlpha=1,this.canvasCtx.textAlign="center",this.canvasCtx.textBaseline="middle"},i.prototype.updateDrawingParameters=function(t){this.lineWidth=t.lineWidth||s.lineWidth,this.lineLength=t.lineLength||s.lineLength,this.rotation=t.rotation||s.rotation,this.color=t.color||s.color},i.prototype.reset=function(){this.position={x:0,y:0},this.angle=0,e(this.canvasCtx)},i.prototype.forward=function(){this.canvasCtx.save(),t(this.canvasCtx),this.canvasCtx.beginPath(),o(this,this.position.x,this.position.y),this.penDown&&this.canvasCtx.stroke(),this.canvasCtx.restore()},i.prototype.right=function(){this.angle+=n.degToRad(this.rotation)},i.prototype.left=function(){this.angle-=n.degToRad(this.rotation)}}(),i}),define("l-system",["jquery","turtle"],function(t,n){function i(t,n){this.rules=n,this.systems=[t],this.variables={},this.constants={},this.states=[],this._step=0,this._initialize()}return function(){function t(t,n){n.penDown=!0,n.forward()}function s(t,n){n.penDown=!1,n.forward()}function e(t,n){n.right()}function o(t,n){n.left()}function a(t,n){t.states.push({position:n.position,angle:n.angle})}function r(t,n){var i=t.states.pop();n.position=i.position,n.angle=i.angle}function h(t){for(var n=t.current(),i="",s=0;s<n.length;s++){var e=n[s];i+=t.rules.hasOwnProperty(e)?t.rules[e]:e}return i}function c(t,n,i){t.variables.hasOwnProperty(i)?t.variables[i](t,n):t.constants.hasOwnProperty(i)&&t.constants[i](t,n)}i.prototype._initialize=function(){this.variables.F=t,this.variables.G=t,this.variables.f=s,this.constants["+"]=e,this.constants["-"]=o,this.constants["["]=a,this.constants["]"]=r},i.prototype.current=function(){return this.systems[this._step]},i.prototype.next=function(){this.systems[this._step+1]||this.systems.push(h(this)),this._step+=1},i.prototype.prev=function(){this._step=Math.max(this._step-1,0)},i.prototype.draw=function(t,i){i=void 0!==i?i:0;for(var s=new n(t),e=this,o=this.current(),a=0;a<o.length;a++)!function(){var t=o[a];setTimeout(function(){c(e,s,t)},i)}()}}(),i});