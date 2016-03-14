
var DEFAULTS = {
    lineLength: 20,
    lineWidth: 1,
    rotation: 90,
    color: {r: 0, g: 0, b: 0, a: 1}
};

function Turtle($canvas, options) {
    this.canvas = $canvas[0];
    this.canvasCtx = this.canvas.getContext('2d');
    this._initialize($.extend({}, DEFAULTS, options || {}));
}

(function() {
    Turtle.prototype._initialize = function(options) {
        this.position = {x:0, y:0};
        this.penDown = true;
        this.angle = 0;
        this.updateDrawingParameters(options);
        this.canvasCtx.lineWidth = this.lineWidth;
        this.canvasCtx.strokeStyle = "black";
        this.canvasCtx.globalAlpha = 1;
        this.canvasCtx.textAlign = "center";
        this.canvasCtx.textBaseline = "middle";
    };

        Turtle.prototype.updateDrawingParameters = function (options) {
        this.lineWidth = options.lineWidth || DEFAULTS.lineWidth;
        this.lineLength = options.lineLength || DEFAULTS.lineLength;
        this.rotation = options.rotation || DEFAULTS.rotation;
        this.color = options.color || DEFAULTS.color;
    };


    function setupInitialCoords (context) {
       context.translate(0, context.canvas.height);
       //context.translate(context.canvas.width/2, context.canvas.height/2);
       context.transform(1, 0, 0, -1, 0, 0);
    }

    Turtle.prototype.reset = function() {
        this.position = {x: 0, y:0};
        this.angle = 0;
        clearContext(this.canvasCtx);
    };

    function clearContext(context) {
       context.save();
       context.setTransform(1,0,0,1,0,0);
       context.clearRect(0,0,context.canvas.width, context.canvas.height);
       context.restore();
    }

    Turtle.prototype.forward = function() {
        this.canvasCtx.save();
        setupInitialCoords(this.canvasCtx);
        this.canvasCtx.beginPath();
        var x = this.position.x;
        var y = this.position.y;

        this.canvasCtx.moveTo(x, y);
        var cosAngle = Math.cos(this.angle);
        var sinAngle = Math.sin(this.angle);
        var newX = x + sinAngle  * this.lineLength;
        var newY = y + cosAngle * this.lineLength;
        this.canvasCtx.lineTo(newX, newY);
        this.position.x = newX;
        this.position.y = newY;
        if (this.penDown) {
          this.canvasCtx.stroke();
        }
        this.canvasCtx.restore();
    };

    Turtle.prototype.right = function() {
        this.angle += degToRad(this.rotation);
    };

    Turtle.prototype.left = function() {
        this.angle -= degToRad(this.rotation);
    };

    function degToRad(deg) {
       return deg / 180 * Math.PI;
    }
})();
