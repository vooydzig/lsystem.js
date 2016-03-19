define(['jquery', 'lsystem', 'presets'], function($, LSystem, PRESETS) {

    function Toolbar($container, $canvas) {
        this.$cont = $container;
        this.$canvas = $canvas;
        this._initialize();
    }

    (function() {
        Toolbar.prototype._initialize = function() {
            initializeLayout(this);
            reset(this);
            initializeSystem(this, this.$preset.val());
        };

        function initializeLayout(that) {
            var $cont = that.$cont;
            that.$preset = $cont.find('#preset');
            that.$addRule = $cont.find('#add-rule');
            that.$next = $cont.find('#simulate-next');
            that.$prev = $cont.find('#simulate-prev');
            that.$custom = $cont.find('.custom-l-system');
            that.$step = $cont.find('#step');

            that.$preset.change({that: that}, onPresetChange);
            that.$addRule.click({that: that}, onAddRuleClick);
            that.$next.click({that: that}, onNextClick);
            that.$prev.click({that: that}, onPrevClick);
            that.$custom.hide();
        }

        function reset(that) {
            that.rules = {};
            that.axiom = {};
            that.system = null;
        }

        function onPresetChange(e) {
            var that = e.data.that;
            var value = $(this).val();
            if (value != 'custom') {
                that.$custom.hide();
                reset(that);
                initializeSystem(that, value);
            }
            else {
                that.$custom.show();
                reset(that);
            }
        }

        function onAddRuleClick(e) {
            var that = e.data.that;
            e.preventDefault();
            e.stopPropagation();
            var $newRule = that.$cont.find('#new-rule');
            if (!$newRule.val())
                return;

            var rule = $newRule.val().replace(' ', '').split(':');
            if (rule.length != 2) {
                $newRule.val('');
                return;
            }

            that.rules[rule[0].trim()] = rule[1];
            updateRulesTable(that);
            $newRule.val('');
        }

        function updateRulesTable(that) {
            var $rules = that.$cont.find('#rules-table').empty();
            for (var key in that.rules)
                if (that.rules.hasOwnProperty(key))
                    $rules.append('<tr><td>'+key+'</td><td>'+that.rules[key]+'</td></tr>');
        }

        function onNextClick(e) {
            var that = e.data.that;
            e.preventDefault();
            e.stopPropagation();
            if (!that.system)
                initializeSystem(that);
            if (!that.system)
                return;

            that.system.next();
            that.system.draw(that.$canvas);
            that.$step.html('Step: ' + that.system._step);
        }

        function onPrevClick(e) {
            var that = e.data.that;
            e.preventDefault();
            e.stopPropagation();
            if (!that.system)
                initializeSystem(that);
            if (!that.system)
                return;

            that.system.prev();
            that.system.draw(that.$canvas);
            that.$step.html('Step: ' + that.system._step);
        }

        function initializeSystem(that, preset) {
            if (preset) {
                that.system = PRESETS[preset]();
                return;
            }

            var start = that.$custom.find('#start').val();
            if (!start)
                return;
            that.system = new LSystem(start, that.rules);
        }
    })();

    return Toolbar;
});