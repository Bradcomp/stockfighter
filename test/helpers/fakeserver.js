var request = require('axios');
var {forEach, reduce} = require('ramda');

var methods = [ 'get','post','put','delete','patch'];

var actualMethods = reduce((acc, method) => {acc[method] = request[method]; return acc}, {}, methods)

var fakeMethod = (method) => 
    (url, body, config) => {
        if (['post', 'put', 'patch'].indexOf(method) === -1) 
            config = body;
        method = method.toUpperCase();
        return new Promise((resolve, reject) => {
            
            fakeServer.requests.push({
                url,
                config,
                method,
                body,
                respond(err, result) {
                    if (arguments.length == 1) return resolve(err);
                    if (err) return reject(err);
                    resolve(result)
                }
            });
        })
    }
var fakeMethods =  {
    get: fakeMethod('get'),
    post: fakeMethod('post'),
    delete: fakeMethod('del'),
    put: fakeMethod('put'),
    patch: fakeMethod('patch')
}

var fakeServer = {
    requests: [],
    next() {
        return this.requests.shift()
    },
    start() {
        forEach(method => request[method] = fakeMethods[method], methods);
        this.requests = [];
    },
    stop() {
        forEach(method => request[method] = actualMethods[method], methods);
    },
    setup() {
        beforeEach(() => this.start());
        afterEach(() => this.stop());
    }
}

module.exports = fakeServer;
    




