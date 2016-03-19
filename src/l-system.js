define(['jquery', 'turtle'], function($, Turtle) {
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