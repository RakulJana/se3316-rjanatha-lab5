var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const users = [] // we are using a local variable for now






// ROUTES FOR API
var port = 8080;
var router = express.Router(); // instance of express.router



// middleware for routes


//


//test route

// more routes
router.route('/users') // routes to users
    .get(function(req, res){ // gets all registered users
        res.json(users); // response is the json object of all users
    })

    .post(function(req,res){
        // must create user, hash password and save it
        // in the url i will be passing a username and password to the variable
        
    
    });



// register the route
app.use('/', router)


// listen
app.listen(port);
console.log(port);