define('utils',[],function() {

    function degToRad(deg) {
        return deg / 180 * Math.PI;
    }

    function radToDeg(rad) {
        return rad / Math.PI * 180;
    }

    return {
        degToRad: degToRad,
        radToDeg: radToDeg
    };
});
define('turtle',['jquery', 'utils'], function($, utils) {
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
           //context.translate(0, context.canvas.height);
           context.translate(context.canvas.width/2, context.canvas.height/2);
           context.transform(1, 0, 0, -1, 0, 0);
        }

        Turtle.prototype.reset = function() {
            this.position = {x: 0, y: 0};
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
            move(this, this.position.x, this.position.y);
            if (this.penDown)
              this.canvasCtx.stroke();
            this.canvasCtx.restore();
        };

        function move(that, x, y) {
            that.canvasCtx.moveTo(x, y);
            that.position.x = getNewPositionX(that, x);
            that.position.y = getNewPositionY(that, y);
            that.canvasCtx.lineTo(that.position.x, that.position.y);
        }

        function getNewPositionX(that, x) { return x + Math.sin(that.angle) * that.lineLength; }
        function getNewPositionY(that, y) { return y + Math.cos(that.angle) * that.lineLength; }

        Turtle.prototype.right = function() {
            this.angle += utils.degToRad(this.rotation);
        };

        Turtle.prototype.left = function() {
            this.angle -= utils.degToRad(this.rotation);
        };
    })();

    return Turtle;
});

define('l-system',['jquery', 'turtle'], function($, Turtle) {
    function LSystem(axiom, rules) {
        this.rules = rules;
        this.systems = [axiom];
        this.variables = {};
        this.constants = {};
        this.states = [];
        this._step = 0;
        this._initialize();
    }

    (function() {
        LSystem.prototype._initialize = function() {
            this.variables['F'] = _draw_forward;
            this.variables['G'] = _draw_forward;
            this.variables['f'] = _move_forward;
            this.constants['+'] = _turn_right;
            this.constants['-'] = _turn_left;
            this.constants['['] = _push_state;
            this.constants[']'] = _pop_state;
        };

        function _draw_forward(that, turtle) {
            turtle.penDown = true;
            turtle.forward();
        }
        function _move_forward(that, turtle) {
            turtle.penDown = false;
            turtle.forward();
        }
        function _turn_right(that, turtle) {
            turtle.right();
        }
        function _turn_left(that, turtle) {
            turtle.left();
        }
        function _push_state(that, turtle) {
            that.states.push({'position': turtle.position, 'angle': turtle.angle})
            //that.turtle.lineLength = Math.max(that.turtle.lineLength/2, 1);
        }
        function _pop_state(that, turtle) {
            var state = that.states.pop();
            turtle.position = state.position;
            turtle.angle= state.angle;
            //that.turtle.lineLength *= 2;
        }

        LSystem.prototype.current = function() {
            return this.systems[this._step];
        };

        LSystem.prototype.next = function() {
            if (!this.systems[this._step+1])
                this.systems.push(next(this));
            this._step += 1;
        };

        function next(that) {
            var current = that.current();
            var next = '';
            for (var i=0; i<current.length; i++) {
                var c = current[i];
                if (that.rules.hasOwnProperty(c))
                    next += that.rules[c];
                else
                    next += c;
            }
            return next;
        }

        LSystem.prototype.prev = function() {
            this._step = Math.max(this._step - 1, 0);
        };

        LSystem.prototype.draw = function ($canvas, delay) {
            delay = (delay !== undefined ? delay : 0);
            var turtle = new Turtle($canvas);
            turtle.reset();
            var that = this;
            var current = this.current();
            for( var i =0; i<current.length; i++) {
                (function() {
                    var c = current[i];
                    setTimeout(function() { runDrawingCallback(that, turtle, c);}, delay);
                })();
            }
        };

        function runDrawingCallback(that, turtle, c) {
            if (that.variables.hasOwnProperty(c))
                that.variables[c](that, turtle);
            else if (that.constants.hasOwnProperty(c))
                that.constants[c](that, turtle);
        }
    })();

    return LSystem;
});
