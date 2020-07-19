const express = require('express');

const app = express();

const port = 8080;

app.use(express.static('../../dist'))

app.listen(port, function() {
    console.log(`I am running on port: ${port}`, 'yaaaayyy!');
});