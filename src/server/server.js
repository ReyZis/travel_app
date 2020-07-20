const express = require('express');

const app = express();

const port = 8081;

app.get('/', (req, res) => {
    res.send('I will be un the main page if you need anything')
})

app.listen(port, function() {
    console.log(`I am running on port: ${port}`, 'yaaaayyy!');
});