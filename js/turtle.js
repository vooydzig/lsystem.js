
var DEFAULTS = {
    lineLength: 10,
    lineWidth: 1,
    rotation: 90,
    color: {r: 0, g: 0, b: 0, a: 1}
};

function Turtle($canvas, $backbuffer, options) {
    this.canvas = $canvas[0];
    this.canvasCtx = this.canvas.getContext('2d');
    this.bufferCtx = $backbuffer[0].getContext('2d');
    this._initialize($.extend({}, DEFAULTS, options || {}));
}

(function() {
    Turtle.prototype._initialize = function(options) {
        this.position = {x:0, y:0};
        this.penDown = true;
        this.angle = 0;
        this.lineWidth = options.lineWidth;
        this.rotation = options.rotation;
        this.lineLength = options.lineLength;
        this.color = options.color;

        this.canvasCtx.lineWidth = this.lineWidth;
        this.canvasCtx.strokeStyle = "black";
        this.canvasCtx.globalAlpha = 1;
        this.canvasCtx.textAlign = "center";
        this.canvasCtx.textBaseline = "middle";
        this.bufferCtx.globalCompositeOperation = 'destination-over';
    };

    function centerCoords (context) {
       var width = context.canvas.width;
       var height = context.canvas.height;
       context.translate(width/2, height/2);
       context.transform(1, 0, 0, -1, 0, 0);
    }

    function draw(that) {
       clearContext(that.bufferCtx);
       that.bufferCtx.drawImage(that.canvas, 0, 0);
    }

    function clear(that) {
       clearContext(that.canvasCtx);
       draw(that);
    }

    function clearContext(context) {
       context.save();
       context.setTransform(1,0,0,1,0,0);
       context.clearRect(0,0,context.canvas.width, context.canvas.height);
       context.restore();
    }

    Turtle.prototype.forward = function() {
        this.canvasCtx.save();
        centerCoords(this.canvasCtx);
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
        draw(this);
    };

    Turtle.prototype.right = function() {
        this.angle += degToRad(this.rotation);
       draw(this);
    };

    Turtle.prototype.left = function() {
        this.angle -= degToRad(this.rotation);
        draw(this);
    };

    function degToRad(deg) {
       return deg / 180 * Math.PI;
    }
})();
