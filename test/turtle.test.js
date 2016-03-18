QUnit.module('Turtle graphics', {
    beforeEach: function() {
        this.$canvas = $('<canvas width="512" height="512"></canvas>');
        this.ctx = this.$canvas[0].getContext('2d');
        this.ctx.translate = sinon.spy();
        this.ctx.save = sinon.stub();
        this.ctx.restore = sinon.stub();
        this.ctx.beginPath = sinon.stub();

        this.ctx.stroke = sinon.spy();
        this.ctx.moveTo = sinon.spy();
        this.ctx.lineTo = sinon.spy();
    }
});

QUnit.test('turtle needs canvas as parameter', function(assert) {
    var turtle = new Turtle(this.$canvas);
    assert.ok(turtle !== null)
});

QUnit.test('turtle position is relative to the canvas center', function(assert) {
    var turtle = new Turtle(this.$canvas);
    assert.equal(turtle.position.x, 0);
    assert.equal(turtle.position.y, 0);
    turtle.forward();
    assert.ok(this.ctx.translate.calledWith(256, 256));
});

QUnit.test('turtle can move', function(assert) {
    var turtle = new Turtle(this.$canvas);
    turtle.forward();
    assert.ok(this.ctx.translate.calledWith(256, 256));
    assert.equal(turtle.position.x, 0);
    assert.equal(turtle.position.y, 20);
});

QUnit.test('turtle draws only when told to', function(assert) {
    var turtle = new Turtle(this.$canvas);
    turtle.penDown = false;
    turtle.forward();
    assert.ok(this.ctx.stroke.notCalled);
    turtle.penDown = true;
    turtle.forward();
    assert.ok(this.ctx.stroke.called);
});

QUnit.test('turtle can rotate', function(assert) {
    var turtle = new Turtle(this.$canvas);
    turtle.right();
    assert.equal(turtle.angle, degToRad(90));
    turtle.left();
    assert.equal(turtle.angle, degToRad(0));
});


QUnit.module('Reseting turtle', {
    beforeEach: function() {
        this.$canvas = $('<canvas width="512" height="512"></canvas>');
        this.turtle = new Turtle(this.$canvas);
        this.ctx = this.$canvas[0].getContext('2d');
        this.ctx.clearRect = sinon.spy();
    }
});

QUnit.test('reseting resets position', function(assert) {
    var turtle = new Turtle(this.$canvas);
    turtle.position = {x: 100, y: 100};
    turtle.reset();
    assert.equal(turtle.position.x, 0);
    assert.equal(turtle.position.y, 0);
});

QUnit.test('reseting resets angle', function(assert) {
    var turtle = new Turtle(this.$canvas);
    turtle.angle = degToRad(90);
    turtle.reset();
    assert.equal(turtle.angle, 0);
});

QUnit.test('reseting clears canvas', function(assert) {
    var turtle = new Turtle(this.$canvas);
    turtle.position = {x: 100, y: 100};
    turtle.reset();
    assert.ok(this.ctx.clearRect.calledWith(0, 0, 512, 512));
});