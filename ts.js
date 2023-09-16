const https = require('https');

https.get('https://ip2.us/', (res) => {
  let rawData = '';
  res.on('data', (chunk) => {
    rawData += chunk;
  });
  res.on('end', () => {
    console.log(rawData);
  });
}).on('error', (err) => {
  console.error(err);
});
