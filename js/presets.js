var PRESETS = {
    "pythagoras-tree": function() {
        var s = new LSystem('F', {$canvas: $('#image') });
        s.addRule('F', 'F[G]G');
        s.addRule('G', 'GG');
        return s;
    },
    "cantor-dust": function() {},
    "koch-curve": function() {
        var s = new LSystem('F', {$canvas: $('#image') });
        s.addRule('F', 'F+F-F-F+F');
        return s;
    },
    "arrow-curve": function() {
        var s = new LSystem('F', {$canvas: $('#image'), rotation: 60 });
        s.addRule('F', '+G-F-G+');
        s.addRule('G', '-F+G+F-');
        return s;
    },
    "sierpinski-triangle": function() {
        var s = new LSystem('F-G-G', {$canvas: $('#image'), rotation: 120 });
        s.addRule('F', 'F-G+F+G-F');
        s.addRule('G', 'GG');
        return s;
    },
    "dragon-curve": function() {
        var s = new LSystem('FX', {$canvas: $('#image')});
        s.addRule('X', 'X+YF+');
        s.addRule('Y', '-FX-Y');
        return s;
    },
    "fractal-plant": function() {
        var s = new LSystem('X', {$canvas: $('#image'), rotation: 25 });
        s.addRule('X', 'F-[[X]+X]+F[+FX]-X');
        s.addRule('F', 'FF');
        return s;
    }
};
