define(function(require, exports, module) {
    // 'use strict';
    var Engine = require('famous/core/Engine');
    var View = require('famous/core/View');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var blurView = require('./blurView');

    // create the main context
    // takes in an object with properties: image and size
    function AppView (options) {
        // options must be an object that contains a content key
        View.apply(this);
        addBlur.call(this,options);
    }

    AppView.DEFAULT_OPTIONS = {

    };

    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

    function addBlur(options) {
        this.blurView = new blurView(options);
        this.blurViewModifier = new StateModifier({});
        this.add(this.blurViewModifier).add(this.blurView);

        this._eventInput.subscribe(this.blurView._eventOutput);
        this._eventInput.on('blurClicked', function () {
            this.blurViewModifier.setTransform(
                Transform.translate(1000,0,0)
            );
        }.bind(this));
    }

    module.exports = AppView;
});