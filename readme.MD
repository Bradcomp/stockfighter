# Stockfighter API client
Promise based ES6 client for connecting with stockfighter API

Has methods corresponding to all API and websocket endpoints listed in the stockfigher docs.

When running in node, use the --harmony_destructuring flag.

Also, the client uses an environmental variable, API_KEY, to authenticate to the API

## USAGE
```javascript
const {checkVenue, buyStock, sellStock} = require('./stockfighter');

checkVenue('ABCDE')
    .then(result => console.log(result)) //{ok: true, venue: 'ABCDE'}
    .catch(err => console.log(err))      //{ok: false, error: 'Stuff and things'}
```

## METHODS
### checkup()
Used to make sure stockfighter is up and running
Takes no parameters, resolves to {ok: true}, rejects with {ok: false, error: reason}


