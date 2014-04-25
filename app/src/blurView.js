/*globals define*/
define(function(require, exports, module) {
    // 'use strict';
    var Engine = require('famous/core/Engine');
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Transform = require('famous/core/Transform');

    // options is an object with a content and size property
    var BlurView = function (options) {
        View.apply(this);
        _addSurface.call(this, options);
        _addListeners.call(this);
    };

    BlurView.prototype = Object.create(View.prototype);
    BlurView.prototype.constructor = BlurView;

    BlurView.DEFAULT_OPTIONS = {
        blurBackgroundColor: 'gray',
        blurOpacity: '0.7'
    };

    var _addSurface = function (options) {
        // ADD SURFACES
        this.blurSurface = new Surface({
            properties: {
                backgroundColor: this.options.blurBackgroundColor,
                opacity: this.options.blurOpacity
            }
        });

        this.imageSurface = new ImageSurface(options);

        // ADD MODIFIERS
        this.blurSurfaceModifier = new StateModifier({
            transform: Transform.translate(0, 0, 1)
        });

        this.imageModifier =  new StateModifier({
            origin: [0.5, 0.5],
            transform: Transform.translate(0, 0, 2)
        });

        // ADD TO BLURVIEW
        this.add(this.imageModifier).add(this.imageSurface);
        this.add(this.blurSurfaceModifier).add(this.blurSurface);
    };

    var _addListeners = function () {
        this.blurSurface.on('click', function () {
            this._eventOutput.emit('blurClicked');
        }.bind(this));
    };

    module.exports = BlurView;
});