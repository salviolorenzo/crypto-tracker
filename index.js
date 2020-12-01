const fetch = require('node-fetch')

const apiKey = '41e10b99-20d0-4200-8bac-a1782b7228d6';
const apiUrl = 'pro-api.coinmarketcap.com/'

const getListings = async (tickers = []) => {
  // const prices = [];

 const data = await fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {qs: {
    'start': '1',
    'limit': '5000',
    'convert': 'USD'
  },
  headers: {
    'Accept': 'application/json' ,'Accept-Encoding': 'deflate, gzip',
    'X-CMC_PRO_API_KEY': apiKey
  }
  })
  .then(res => res.json())
  .then(response => {
    return response.data.filter(crypto => tickers.indexOf(crypto.symbol) !== -1).map(crypto => {
        return {
            ...crypto,
            quote: crypto.quote.USD
        }
    })
  }).catch((err) => {
    console.log('API call error:', err.message);
  });

  const bigDrops = [];
   data.forEach(item => {
    if(item.quote.percent_change_1h < -1){
      bigDrops.push({
        ticker: item.symbol,
        change: item.quote.percent_change_1h
      });
    }
  });

  console.log(bigDrops);
}

getListings(['BTC', 'ETC', 'XRP', 'XLM', 'LTC', 'ETH']); 