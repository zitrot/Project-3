// Setup empty JS object to act as endpoint for all routes
projectData = {};
const port = process.env.PORT || 3000;
// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const server = app.listen(port, () => { console.log(`running on localhost: ${port}`) });


projectData = [];
app.post('/add', function(request, response) {
    console.log("data recieved", request.body);
    projectData.push(request.body);
});

app.get('/all', sendData);

function sendData(request, response) {
    response.send(projectData);
};

app.get('/lastItem', sendLastItem);

function sendLastItem(request, response) {
    response.send(projectData.slice(-1)[0]);
};