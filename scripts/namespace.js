(function () {
    let eventEmmiter = require('super-event-emitter');

    window.blog = {
        models: {},
        controllers: {},
        views: {},
        services: {},
        utils: {},
        runtime: new eventEmmiter()
    };
}());

