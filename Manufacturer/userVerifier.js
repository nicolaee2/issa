const axios = require('axios');

// every 10 seconds, send a verification request to the manufacturer for renter
setInterval(async () => {
    const response = await axios.post('http://localhost:3000/verify-renter');
    console.log(response.data);
}, 10000);

// every 20 seconds, send a verification request to the manufacturer for owner
setInterval(async () => {
    const response = await axios.post('http://localhost:3000/verify-owner');
    console.log(response.data);
}, 20000);