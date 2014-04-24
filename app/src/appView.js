define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var Surface = require('famous/core/Surface');
    var StateModifier = require('famous/modifiers/StateModifier');
    var View = require('famous/core/View');
    var Event = require('famous/core/EventHandler');
    var blurView = require('./blurView');

    // create the main context
    // takes in an object with properties: image and size
    function appView (image) {
        View.apply(this);
        this.image = image;
        addImage.call(this);
        _setEventListeners.call(this);
    }

    appView.prototype = Object.create(View.prototype);
    appView.prototype.constructor = appView;

    function addImage(size) {
        this.add(this.image);
        this.image.on('click', function() {
            this._eventOutput.emit('click');
        }.bind(this));
    }

    function addBlur(image) {
        this.blurView = new blurView(this.image);
        this.add(this.blurView);
    }

    function _setEventListeners() {
        // When image is clicked addBlur
        this.on('click', function() {
            addBlur.call(this);
        }.bind(this));
    }

    module.exports = appView;
});