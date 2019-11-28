// =======================================================
// Basic Declaration to be used throuhout the file
//
//=====================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const nodeMailer = require('nodeMailer')
var validator = require('validator');
var mongoose = require('mongoose');
//var nev = require('email-verification')(mongoose);
// note, to end up hashing the pw, we need a salt + hash system
mongoose.connect('mongodb+srv://dbuser:dbpass@lab3-9l1zz.mongodb.net/test?retryWrites=true&w=majority')

// ==================================
// MODELS that will be used
var User = require('./app/models/users') // we are calling the user model from the other file

//====================================================
// set up the email we will be sending from 
var sender = nodeMailer.createTransport({
    service: "Gmail"
})

// ===========================================================
app.use(bodyParser.urlencoded({extended: true},
    { useUnifiedTopology: true }
    ));
app.use(bodyParser.json());

// =========================================
// PORT AND ROUTER INIT
// ==========================================
var port = 8080;
var router = express.Router(); // instance of express.router
// ==========================================================



// middleware for routes
// HEADERS
router.use(function(req, res, next) {
    // do logging
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    //console.log('something is happening.');
    next(); // make sure we go to next routes
});

// =======================================================


// ----------------------------------------------------------------------------------------------------------------
// ROUTES
//
//
//==================================================================================================================

// ROUTE TO GET USERS
router.route('/users') 

    .get(function (req, res) { // gets all registered users
        //res.json(users); // response is the json object of all users
        User.find(function (err, users) {  // looks for all users in users
            if (err){
                res.send(err);
            }
            res.send(users);
        });

    });
// ROUTE WILL BE USED TO CREATE A NEW USER
router.route('/newuser')
    .post(async function (req, res) {
        // initialize variables to be used from the post req
        var name = req.body.name;
        var pass = req.body.pass;
        //var verified = req.body.verified;
        
        // basic checks to see if empty value
        if (name === ""){ return res.send({message: 'Empty email field'})};
        if (!validator.isEmail(name)){ return res.send({message: 'Invalid email field'})};;
        if (pass === ""){ return res.send({message: 'Empty password field'})};
        
        // this sets up our hash password
        try{
            var salt = await bcrypt.genSalt()
            var hashPass = await bcrypt.hash(pass, salt); // will take the password we send and the associated salt made
            // the new has pass we made, will be used to store in the db
            // the hashPass already has the associated salt
        }catch{
            res.status(500).send();
        }
        
        var verificationC = "abc"
        // must create user, hash password and save it
        // in the body i will be passing a username and password to the variable
        // DEFINE THE NEW USER
        user = new User();
        user.name = req.body.name; // this will use the req body name for the post requiest and use the user model to add it in the collection we made
        user.pass = hashPass; // we want to end up hashing the passswords, so no one will know
        user.verificationC = verificationC;
        user.verified = false;
        user.disabled = true;
        
        user.save(function (err) {
            if (err) {
                res.send(err)
            }
            res.json(user.pass);
        })
// WILL DO VERIFICATION FOR THE USER AFTER
    });

// Route to see if user already exists
router.route('/login')
.post(function (req, res) { // gets all registered users
    //res.json(users); // response is the json object of all users
    var name = req.body.name;
    //console.log(name);
    var pass = req.body.pass;
    //console.log(passw);
    if (name === ""){ return res.send({message: 'Empty email field'})};
    if (!validator.isEmail(name)){ return res.send({message: 'Invalid email field'})};;
    if (pass === ""){ return res.send({message: 'Empty password field'})};
    
    User.findOne({name: name}, function (err, users) {  // looks for all users in users
        if(err){
            return res.send({mesage: "NO GO"})
        }
        if (users === null){
            return res.send({message: "Does not exist"})
        }
        
        //res.json(users);
        //console.log(users)
        // checks to see if the password made was correct
        var check = bcrypt.compareSync(pass, users.pass)
        if (check){
            console.log('true');
            var verified = users.verified;
            var disabled = users.disabled;
            var admin = users.admin;
            res.status(400).send();
        }
        else{
            console.log('false')
        }
        // =====================================================
        // in this portion i must do the checks to accordingly route them
        //=====================================================
        if (!verified){
            return res.send({message:"you are good", id: users._id})
        }
            else if(!verified)
                return res.send({message:"you are  good", id: users._id})
        if(disabled){
            return res.send({mesage:"disabled", id: users._id})
        }

    });

});




// register the route
app.use('/', router)


// listen
app.listen(port);
console.log(port);

