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
All methods that take more than one parameter are automatically <a href="https://hughfdjackson.com/javascript/why-curry-helps/">curried</a> for ease of reuse.

## API METHODS
See <a href="https://starfighter.readme.io/v1.0/docs">Stockfighter API Docs</a> for details on the responses. 
### Checkups 
#### checkup()
#### checkVenue(venue)

### Stock Info
#### getStocks(venue)
#### getQuote(venue, stock)
#### getOrderbook(venue, stock)

### Stock Ordering
#### buyStock(account, venue, orderType, stock, price, qty)
#### sellStock(account, venue, orderType, stock, price, qty)
#### orderStock(direction, account, venue, orderType, stock, price, qty) 
Order stock is so you can programatically determine the direction.
#### checkOrder(venue, stock, id)
#### checkAllOrders(account, venue)
#### checkStockOrders(account, venue, stock)
#### cancelOrder(venue, stock, id)

## WEB SOCKET METHODS
```javascript
api.ticker('ACCT', 'OBSEC', message => {
    //Do something with each message that gets sent back :-)
})
```

### Ticker Tape
#### ticker(account, venue, onMessage)
#### stockTicker(account, venue, stock, onMessage)

### Executions
#### executions(account, venue, onMessage)
#### stockExecutions(account, venue, stock, onMessage)






