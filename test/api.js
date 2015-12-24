'use strict';
var fakeServer = require('./helpers/fakeserver');
var {strictEqual, deepEqual} = require('assert');
var api = require('../index.js');

describe('Stockfighter API connect', () => {
    describe('Checkup', () => {
        fakeServer.setup();
        it('Should check if the stockfighter API is up', done => {
            api
                .checkup()
                .then(result => {
                    deepEqual(result, {ok: true, error: '', here: true});
                    done();
                });
            strictEqual(fakeServer.requests.length, 1);
            let req = fakeServer.next();
            strictEqual(req.method, 'GET');
            strictEqual(req.url, 'https://api.stockfighter.io/ob/api/heartbeat');
            req.respond({status: 200, data: {ok: true, error: '', here: true}});
        });
        /* The failure criteria for all the endpoints is the same */ 
        it('should reject if the server is down', done => {
            api
                .checkup()
                .catch(err => {
                     deepEqual(err, {ok: false, error: 'could not connect to API'});
                     done();
                });
        
            fakeServer
                .next()
                .respond({status: 400, data: {ok: false, error: 'could not connect to API'}});
        });
    });
    describe('Check Venue', () => {
        fakeServer.setup();
        it('should check if a venue is up', done => {
            api
                .checkVenue('ABCDE')
                .then(result => {
                    deepEqual(result, {ok: true, venue: 'ABCDE'});
                    done();
                });
            
            strictEqual(fakeServer.requests.length, 1);
            let req = fakeServer.next();
            strictEqual(req.method, 'GET');
            strictEqual(req.url, 'https://api.stockfighter.io/ob/api/venues/ABCDE/heartbeat');
            req.respond({status: 200, data: {ok: true, venue: 'ABCDE'}});    
        });
    });
    describe('Stock Orders', () => {
        fakeServer.setup();
        it('Should let you buy stock', done => {
            api
                .buyStock('ACCT', 'ABCDE', 'limit', 'APPL', 7750, 150)
                .then(result => {
                    deepEqual(result, {
                        ok: true,
                        symbol: 'APPL',
                        venue: 'ABCDE',
                        direction: 'buy',
                        qty: 100,
                        account: 'ACCT'
                    });
                    done();
                });
            strictEqual(fakeServer.requests.length, 1);
            let req = fakeServer.next();
            strictEqual(req.method, 'POST');
            strictEqual(req.url, 'https://api.stockfighter.io/ob/api/venues/ABCDE/stocks/APPL/orders');
            deepEqual(req.body, {
                account: 'ACCT',
                venue: 'ABCDE',
                stock: 'APPL',
                price: 7750,
                qty: 150,
                direction: 'buy',
                orderType: 'limit'
            });
            req.respond({status: 200, data: {
                ok: true,
                        symbol: 'APPL',
                        venue: 'ABCDE',
                        direction: 'buy',
                        qty: 100,
                        account: 'ACCT'
                        //...
            }})

        });
    });
});