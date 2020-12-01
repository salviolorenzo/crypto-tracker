require('dotenv').config()
const fetch = require('node-fetch')
const nodemailer = require('nodemailer');


const apiKey = process.env.API_KEY ;
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
    
    if(response.data){
      
      return response.data.filter(crypto => tickers.indexOf(crypto.symbol) !== -1).map(crypto => {
        return {
          ...crypto,
          quote: crypto.quote.USD
        }
      })
    }
  }).catch((err) => {
    console.log('API call error:', err.message);
  });

  const bigDrops = [];
  data.forEach(item => {
    if(item.quote.percent_change_1h < 0){
      bigDrops.push({
        ticker: item.symbol,
        change: item.quote.percent_change_1h.toFixed(3),
        price: item.quote.price.toFixed(3)
      });
    }
  });

  console.log(bigDrops);
}

  const sendEmail = () => {
console.log(process.env)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const mailOptions = {
  from: process.env.MAIL_USER,
  to: process.env.MAIL_USER,
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
  }



sendEmail();

  setInterval(
   () =>  getListings(['BTC', 'ETC', 'XRP', 'XLM', 'LTC', 'ETH']), 5000
  )

// getListings(['BTC', 'ETC', 'XRP', 'XLM', 'LTC', 'ETH']); 