define(function() {

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