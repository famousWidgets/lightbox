/*globals define*/
define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var Surface = require('famous/core/Surface');
    var StateModifier = require('famous/modifiers/StateModifier');
    var blurView = require('./blurView');
    var AppView = require('./appView');
    // create the main context
    var mainContext = Engine.createContext();

    // your app here

    var logo = new ImageSurface({
        size: [300,300],
        content: 'content/images/famous_logo.png'
    });
    var image = new ImageSurface({
        size: [200,200],
        content: 'content/images/tiger.jpg'
    });

    var logoModifier = new StateModifier({
        origin: [0.5,0.5]
    });
    var appView = new AppView(image);
    mainContext.add(logoModifier).add(logo);
    mainContext.add(appView);

});
