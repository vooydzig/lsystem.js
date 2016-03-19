define(['l-system'], function(LSystem) {
    return {
        "pythagoras-tree": function() {
            return new LSystem('F', {'F': 'F[G]G', 'G': 'GG'});
        },
        "cantor-dust": function() {},
        "koch-curve": function() {
            return  new LSystem('F', {'F': 'F+F-F-F+F'});
        },
        "arrow-curve": function() {
            //, rotation: 60
            return new LSystem('F', {'F': '+G-F-G+', 'G': '-F+G+F-'});
        },
        "sierpinski-triangle": function() {
            //rotation: 120
            return new LSystem('F-G-G', {'F': 'F-G+F+G-F', 'G': 'GG'});
        },
        "dragon-curve": function() {
            return  new LSystem('FX', {'X': 'X+YF+', 'Y': '-FX-Y'});
        },
        "fractal-plant": function() {
            //rotation: 25
            return new LSystem('X', {'X': 'F-[[X]+X]+F[+FX]-X', 'F': 'FF'});
        }
    };

});