/*globals define*/
define(function(require, exports, module) {
    // 'use strict';
    var Engine = require('famous/core/Engine');
    var View = require('famous/core/View');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    var BlurView = require('./blurView');

    // options is an object with a content and size property
    var AppView = function (options) {
        View.apply(this);
        _addBlurView.call(this, options);
        _addListeners.call(this);
    };

    AppView.DEFAULT_OPTIONS = {
        farAway: 1000
    };

    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

    var _addBlurView = function (options) {
        this.blurView = new BlurView(options);
        this.blurViewModifier = new StateModifier({});
        this.add(this.blurViewModifier).add(this.blurView);
    };
    var _addListeners = function () {
        this._eventInput.subscribe(this.blurView._eventOutput);
        this._eventInput.on('blurClicked', function () {
            this.blurViewModifier.setTransform(
                Transform.translate(this.options.farAway, 0, 0)
            );
        }.bind(this));
    };

    module.exports = AppView;
});