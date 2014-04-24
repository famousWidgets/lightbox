/*globals define*/
define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var Surface = require('famous/core/Surface');
    var StateModifier = require('famous/modifiers/StateModifier');
    var View = require('famous/core/View');
    var Transform = require('famous/core/Transform');

    // takes current image puts in onto of a blur
    function blurView (image) {
        View.apply(this);
        _addSurface.call(this, image);
    }

    blurView.prototype = Object.create(View.prototype);
    blurView.prototype.constructor = blurView;

    function _addSurface(image) {
        var surface = new Surface({
            properties: {
                backgroundColor: 'gray',
                opacity: '0.7'
            }
        });
        var surfaceModifier = new StateModifier({
            transform: Transform.translate(0,0,1)
        });
        var imageModifier =  new StateModifier({
            origin: [0.5,0.5],
            transform: Transform.translate(0,0,2)
        });
        this.add(imageModifier).add(image);
        this.add(surfaceModifier).add(surface);
    }
    module.exports = blurView;
});
