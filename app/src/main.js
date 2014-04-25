/*globals define*/
define(function(require, exports, module) {
    // 'use strict';
    var Engine = require('famous/core/Engine');
    var AppView = require('./appView');

    var mainContext = Engine.createContext();

    window.LightBox = function (src) {
        var appView = new AppView({
            content: src,
            size: [200, 200]
        });

        mainContext.add(appView);
    };

    AppView();

    module.exports = LightBox;
});
