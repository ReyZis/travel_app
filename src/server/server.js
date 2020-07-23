let projectData = [];

var path = require('path')

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
const cors = require('cors');

/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance (lets our server to contact other servers)
app.use(cors());

// Initialize the main project folder
app.use(express.static(path.resolve(__dirname, '..', '..', 'dist')));



// Spin up the server
const port = 8080;
const server = app.listen(port, listening());


// Callback to debug
function listening() {
    console.log('the server is running');
    console.log(`localhost: ${port}`);
}

// Initialize all route with a callback function
app.get('/all', sendProjectData);
app.post('/addEntry', addNewEntry);


// Post Route
function addNewEntry(req, res) {
    projectData.push(req.body)
}

function sendProjectData(req, res) {
    res.send(projectData)
}