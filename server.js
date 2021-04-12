// Setup empty JS object to act as endpoint for all routes
var projectData = [];

// Require Express to run server and routes
// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());


// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;

// TODO-Spin up the server
const server = app.listen(port, listening);
function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
    console.log(projectData)
    
};



app.post('/postData', callBack);

function callBack(request,response){
   let data={
       temp:request.body.temp,
       feeling: request.body.feelings,
       date:request.body.date,
       
   }
    projectData.push (data);
    console.log(projectData);
    response.send(projectData);
  // response.send();
}

app.get('/get', sendData);

function sendData (request, response) {
  response.send(projectData[projectData.length-1]);
  console.log(projectData[projectData.length-1]);
};