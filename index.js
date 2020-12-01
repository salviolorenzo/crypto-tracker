const fetch = require('node-fetch')

const apiKey = '41e10b99-20d0-4200-8bac-a1782b7228d6';
const apiUrl = 'pro-api.coinmarketcap.com/'

const getListings = (tickers = []) => {
  const prices = [];

  fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {qs: {
    'start': '1',
    'limit': '5000',
    'convert': 'USD'
  },
  headers: {
    'X-CMC_PRO_API_KEY': apiKey
  }
  })
  .then(res => res.json())
  .then(response => {
    response.data.forEach(crypto => {
      if(tickers.indexOf(crypto.symbol) !== -1){
        prices.push({
            ...crypto,
            quote: crypto.quote.USD
        })
      }
    })

    console.log(prices)

  }).catch((err) => {
    console.log('API call error:', err.message);
  });


}

getListings(['BTC', 'ETC', 'XRP', 'XLM', 'LTC', 'ETH']); 