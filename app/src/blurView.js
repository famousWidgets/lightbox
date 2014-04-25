/*globals define*/
define(function(require, exports, module) {
    // 'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var Surface = require('famous/core/Surface');
    var StateModifier = require('famous/modifiers/StateModifier');
    var View = require('famous/core/View');
    var Transform = require('famous/core/Transform');

    // takes current image puts in onto of a blur
    function blurView (options) {
        View.apply(this);
        _addSurface.call(this, options);
    }

    blurView.prototype = Object.create(View.prototype);
    blurView.prototype.constructor = blurView;

    function _addSurface(options) {
        this.blurSurface = new Surface({
            properties: {
                backgroundColor: 'gray',
                opacity: '0.7'
            }
        });

        this.imageSurface = new ImageSurface(options);

        this.blurSurface.on('click', function () {
            this._eventOutput.emit('blurClicked');
        }.bind(this));

        this.blurSurfaceModifier = new StateModifier({
            transform: Transform.translate(0,0,1)
        });
        this.imageModifier =  new StateModifier({
            origin: [0.5,0.5],
            transform: Transform.translate(0,0,2)
        });

        this.add(this.imageModifier).add(this.imageSurface);
        this.add(this.blurSurfaceModifier).add(this.blurSurface);
    }
    module.exports = blurView;
});
