function LSystem(start, options) {
    this.systems = [start];
    this.step = 0;
    this.rules = {};
    this.variables = {};
    this.constants = {};
    this.states = [];
    this.turtle = new Turtle(options.$canvas, options);
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

    LSystem.prototype.updateDrawingParameters = function (drawingParameters) {
        this.turtle.updateDrawingParameters(drawingParameters);
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
        that.states.push({'position': that.turtle.position, 'angle': that.turtle.angle})
        //that.turtle.lineLength = Math.max(that.turtle.lineLength/2, 1);
    }
    function _pop_state(that) {
        var state = that.states.pop();
        that.turtle.position = state.position;
        that.turtle.angle= state.angle;
        //that.turtle.lineLength *= 2;
    }
    
    function getCurrentStep(that) {
        return that.systems[that.step];
    }

    LSystem.prototype.addRule = function(name, value) {
        this.rules[name] = value;
    };

    LSystem.prototype.draw = function(delay) {
        delay = (delay !== undefined ? delay : 0);
        this.turtle.reset();
        var that = this;
        var current = getCurrentStep(this);
        for( var i =0; i<current.length; i++) {
            (function() {
                var c = current[i];
                setTimeout(function() { runDrawingCallback(that, c);}, delay);
            })();
        }
    };

    function runDrawingCallback(that, c) {
        if (that.variables.hasOwnProperty(c))
            that.variables[c](that);
        else if (that.constants.hasOwnProperty(c))
            that.constants[c](that);
    }
    
    LSystem.prototype.next = function() {
        var system = this.systems[this.step+1];
        if (system) {
            this.step += 1;
            return;
        }
        
        var current = getCurrentStep(this);
        var next = '';
        for( var i =0; i<current.length; i++) {
            var c = current[i];
            if (this.rules.hasOwnProperty(c))
                next += this.rules[c];
            else
                next += c;
        }
        this.systems.push(next);
        this.step += 1;
    };
    
    LSystem.prototype.prev = function() {
        this.step = Math.max(0, this.step-1);
    };

})();