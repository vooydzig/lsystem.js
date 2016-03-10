function LSystem(start, options) {
    this.start = start;
    this.system = this.start;
    this.step = 0;
    this.rules = {};
    this.variables = {};
    this.constants = {};
    this.states = [];
    this.turtle = new Turtle(options.$canvas, options.$backbuffer, options);
    this._initialize();
}

(function() {
    LSystem.prototype._initialize = function() {
        this.variables['F'] = _draw_forward;
        this.variables['f'] = _move_forward;

        this.constants['+'] = _turn_right;
        this.constants['-'] = _turn_left;
        this.constants['['] = _push_state;
        this.constants[']'] = _pop_state;
    };

    function _draw_forward(that) {
        that.turtle.penDown = true;
        that.turtle.forward();
    }
    function _move_forward(that) {
        that.turtle.penDown = false;
        that.turtle.forward();
    }
    function _turn_right(that) {
        that.turtle.right();
    }
    function _turn_left(that) {
        that.turtle.left();
    }
    function _push_state(that) {
        that.states.push({'position': that.turtle.position, 'angle': self.that.turtle.angle})
    }
    function _pop_state(that) {
        var state = that.states.pop();
        that.turtle.position = state.position;
        that.turtle.angle= state.angle;
    }

    LSystem.prototype.addRule = function(name, value) {
        this.rules[name] = value;
    };

    LSystem.prototype.draw = function() {
        this.turtle.position = {x: 0, y:0};
        for( var i =0; i<this.system.length; i++) {
            var c = this.system[i];
            if (this.variables.hasOwnProperty(c))
                this.variables[c](this);
            else if (this.constants.hasOwnProperty(c))
                this.constants[c](this);
        }
    };

    LSystem.prototype.simulate = function() {
        var next = '';
        for( var i =0; i<this.system.length; i++) {
            var c = this.system[i];
            if (this.rules.hasOwnProperty(c))
                next += this.rules[c];
            else if (this.constants.hasOwnProperty(c))
                next += c;
        }
        console.log(next);
        this.system = next;
        this.step += 1;
    };
})();