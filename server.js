// basic declaration

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
// note, to end up hashing the pw, we need a salt + hash system

var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dbuser:dbpass@lab3-9l1zz.mongodb.net/test?retryWrites=true&w=majority')

var User = require('./app/models/users') // we are calling the user model from the other file
app.use(bodyParser.urlencoded({extended: true},
    { useUnifiedTopology: true }
    ));
app.use(bodyParser.json());

// ROUTES FOR API
var port = 8080;
var router = express.Router(); // instance of express.router



// middleware for routes
router.use(function(req, res, next) {
    // do logging
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    //console.log('something is happening.');
    next(); // make sure we go to next routes
});

//


//test route

// more routes
router.route('/users') // routes to users

    .get(function (req, res) { // gets all registered users
        //res.json(users); // response is the json object of all users
        User.find(function (err, users) {  // looks for all users in users
            res.json(users);
        });

    })
    .post(async function (req, res) {
        
        try{
            var salt = await bcrypt.genSalt()
            var hashPass = await bcrypt.hash(req.body.pass, salt); // will take the password we send and the associated salt made
            //console.log(salt);
            //console.log(hashPass);
            // the new has pass we made, will be used to store in the db
            // the hashPass already has the associated salt
        }catch{
            res.status(500).send();
        }
        
        // must create user, hash password and save it
        // in the url i will be passing a username and password to the variable
        user = new User();
        user.name = req.body.name; // this will use the req body name for the post requiest and use the user model to add it in the collection we made
        user.pass = hashPass; // we want to end up hashing the passswords, so no one will know
        // to use bcrypt correctly, we need to store a salt alongside the pw
        user.save(function (err) {
            if (err) {
                res.send(err)
            }
            res.json(user.pass);
        })

    });

router.route('/users/login')
.post(function (req, res) { // gets all registered users
    //res.json(users); // response is the json object of all users
    var name = req.body.name;
    console.log(name);

    var passw = req.body.pass;
    console.log(passw);
    var query = {};
    query[name];
    User.findOne({name: name}, function (err, users) {  // looks for all users in users
        if(err){
            res.send(err);
        }
        res.json(users);
        console.log(users)
        if (bcrypt.compareSync(passw, users.pass)){
            console.log('true')
            res.status(400).send();
        }
        else{
            console.log('false')
        }
        
    });

});


// register the route
app.use('/', router)


// listen
app.listen(port);
console.log(port);