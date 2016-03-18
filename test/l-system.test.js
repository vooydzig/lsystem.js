QUnit.module('LSystem basics', {
    beforeEach: function() {
        this.axiom = 'F';
        this.rule = {'F': 'F-F'};
    }
});

QUnit.test('l-system starts with given axiom', function(assert) {
    var system = new LSystem(this.axiom, this.rule);
    assert.equal(system.current(), this.axiom)
});

QUnit.test('l-system can start with multiple rules', function(assert) {
    var system = new LSystem(this.axiom, {'F': 'F-F', 'A': 'A'});
    assert.ok('F' in system.rules);
    assert.ok('A' in system.rules);
});

QUnit.test('l-system evolves forward according to given rule', function(assert) {
    var system = new LSystem(this.axiom, this.rule);
    system.next();
    assert.equal(system.current(), 'F-F')
});

QUnit.test('l-system can evolve forward multiple times', function(assert) {
    var system = new LSystem(this.axiom, this.rule);
    system.next();
    system.next();
    assert.equal(system.current(), 'F-F-F-F');
});

QUnit.test('l-system can evolve backwards', function(assert) {
    var system = new LSystem(this.axiom, this.rule);
    system.next();
    system.prev();
    assert.equal(system.current(), 'F');
});

QUnit.module('LSystem drawing', {
    beforeEach: function() {
        this.axiom = 'F';
        this.rule = {'F': 'F-F'};
        this.system = new LSystem(this.axiom, this.rule);
        this.$canvas = $('<canvas width="512" height="512"></canvas>');
        this.ctx = this.$canvas[0].getContext('2d');
        this.ctx.translate = sinon.spy();
        this.ctx.save = sinon.stub();
        this.ctx.restore = sinon.stub();
        this.ctx.beginPath = sinon.stub();

        this.ctx.stroke = sinon.spy();
        this.ctx.moveTo = sinon.spy();
        this.ctx.lineTo = sinon.spy();

        this.clock = sinon.useFakeTimers();
    },
    tearDown: function () {
        this.clock.restore();
    }
});

QUnit.test('LSystem cam be drawn to canvas', function(assert) {
    this.system.draw(this.$canvas);
    this.clock.tick();
    assert.ok(this.ctx.lineTo.calledWith(0, 20));
    assert.ok(this.ctx.stroke.called);
});

QUnit.test('LSystem cam be drawn to canvas with delay', function(assert) {
    var delay = 100;
    this.system.draw(this.$canvas, delay);
    this.clock.tick(delay - 1);
    assert.ok(!this.ctx.lineTo.called);
    assert.ok(!this.ctx.stroke.called);
    this.clock.tick(1);
    assert.ok(this.ctx.lineTo.calledWith(0, 20));
    assert.ok(this.ctx.stroke.called);
});

