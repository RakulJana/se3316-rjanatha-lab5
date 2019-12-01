// =======================================================
// Basic Declaration to be used throuhout the file
//
//=====================================================
var verificationC = "abc";
//var host;
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const nodeMailer = require('nodeMailer')
var validator = require('validator');
var mongoose = require('mongoose');
var nev = require('email-verification')(mongoose);
// note, to end up hashing the pw, we need a salt + hash system
mongoose.connect('mongodb+srv://dbuser:dbpass@lab3-9l1zz.mongodb.net/test?retryWrites=true&w=majority')

// ==================================
// MODELS that will be used
var User = require('./app/models/users') // we are calling the user model from the other file
var Song = require('./app/models/songs') // we are calling the user model from the other file
//var Review = require('./app/models/songs') // we are calling the user model from the other file
//====================================================
// set up the email we will be sending from 
var sender = nodeMailer.createTransport({
    service: "Gmail",
    auth: {
        username: "thetestman9@gmail.com",
        password: 'thetestman123'
    }
});

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
    res.header("Access-Control-Allow-Credentials", "true")
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

// ROUTES FOR UNAUTHENTICATED USERS
router.route('/open/songs') // works well
.get(function (req, res) { // gets all registered songs
    
    Song.find(function (err, songs) {  // looks for all songs in song, gets it
        if (err){
            res.send(err);
        }
        res.send(songs);
    });

});

// this route is to find a specific song by song id, so if a user would want more information for a specific song
router.route('/open/songs/:song_id') // works well
    // get a specific song with an associated ID
    .get(function (req, res) {
        Song.findById(req.params.song_id, function (err, song) {
            if (err)
                res.send(err);
            
            res.json(song)
        })
    });

    // this route will be used for the primary query of song titles into our database, we will might be calling an external function as well
router.route('/open/songs/search/:stitle')
    .get(function(req, res){
        //var title = req.params.stitle;
        clean = new RegExp(req.params.stitle, 'gi'); // this is a function i found online, that is used for search queries, i will reference if need be 
        Song.find({stitle: clean}, function (err, search){
            if (err){
                return res.send(err);
            }
            if(search === null){
                return res.send({messgae:"the search did not find anything"})
            }
           return res.json(search);
        })
    })

//ROUTES FOR AUTHENTICATED USERS

// this route will be used to add a song, so far just song name and type of artist
router.route('/auth/addsong')
    .post(function (req,res) { // this route works well after testing

        /*var rating = req.body.reviews.rating;
        var reviewDes = req.body.reviews.reviewDes;
        var reviewName = req.body.reviews.reviewName;
        WE WOULDNT ADD THIS HERE BECAUSE THEY ARE JUST ADDING A SONG
        HOWEVER, IN UPDATE WE WOULD BE ABLE TO ADD A REVIEW
        */
        song = new Song();
        song.stitle = req.body.stitle;
        song.sartist = req.body.sartist;

        if (song.sartist === "" || song.sartist === undefined){ return res.send({message: 'Empty artist field'})};
        if (song.stitle === "" || song.stitle === undefined){ return res.send({message: 'Empty title field'})};
        song.salbum = req.body.salbum;
        song.syear = req.body.syear;
        song.strack = req.body.strack;
        song.sgenre = req.body.sgenre;
        song.save(function (err) {
            if (err) {
                res.send(err)
            }
            return res.json({message: 'success'});
        })
       //return res.send(songname);
    });
    router.route('/auth/addboth') // works well after testing
    .post(function (req,res) {

        
        song = new Song();
        song.stitle = req.body.stitle;
        song.sartist = req.body.sartist;

        if (song.sartist === "" || song.sartist === undefined){ return res.send({message: 'Empty artist field'})};
        if (song.stitle === "" || song.stitle === undefined){ return res.send({message: 'Empty title field'})};
        song.salbum = req.body.salbum;
        song.syear = req.body.syear;
        song.strack = req.body.sgenre;
        song.sgenre = req.body.sgenre;
        // same concept as my other routes, but i combined the two due to a specific requirement
        var localReview = { rating: req.body.rating, reviewdes: req.body.reviewdes, reviewname: req.body.reviewname }; // this stores a local object of the review added
        song.reviews.push(localReview);
        song.save(function (err) {
            if (err) {
                res.send(err)
            }
            return res.json({message: 'success'});
        })
       //return res.send(songname);
    });

// this route will be to add a review, given an id
router.route('/auth/songs/addreview/:song_id') // works well after testing
    //ADDING A REVIEW FOR A SONG
    .post(function (req, res) {
        // use the other item model to find the item we want
        Song.findById(req.params.song_id, function (err, song) {
            if (err)
                res.send(err);
            var localReview = { reviewdes: req.body.reviewdes, reviewname: req.body.reviewname }; // this stores a local object of the review added
            song.reviews.push(localReview);
            // save the song
            song.save(function (err) {
                if (err)
                    res.send(err)
                res.json({ message: 'Review Saved' });
            });
        });
    });

router.route('/auth/songs/addrating/:song_id')
    //ADDING A RATING FOR A SONG
    .post(function (req, res) {
        // use the other item model to find the item we want
        Song.findById(req.params.song_id, function (err, song) {
            if (err)
                res.send(err);
            var localReview = { rating: req.body.rating, reviewname: req.body.reviewname }; // this stores a local object of the review added
            song.reviews.push(localReview);
            // save the song
            song.save(function (err) {
                if (err)
                    res.send(err)
                res.json({ message: 'Review Saved' });
            });
        });
    });





// this route should be used for the authenticated user to delete a particular song 
router.route('/auth/songs/:song_id') // works great

    //delete a specific song based on an id
    .delete(function (req, res) {
        Song.remove({
            _id: req.params.song_id
        }, function (err, song) {
            if (err)
                res.send(err);
            res.json({ message: 'Success in deleting' });
        });
    });


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
router.route('/register')
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
            var salt =await bcrypt.genSalt()
            var hashPass =await bcrypt.hash(pass, salt); // will take the password we send and the associated salt made
            // the new has pass we made, will be used to store in the db
            // the hashPass already has the associated salt
        }catch{
            res.status(500).send();
        }
        user = new User();
        user.name = req.body.name; // this will use the req body name for the post requiest and use the user model to add it in the collection we made
        user.pass = hashPass; // we want to end up hashing the passswords, so no one will know
        user.verificationC = verificationC;
        user.verified = false;
        user.disabled = false;
        /**
         * 
         * 
         */
        
        User.findOne({name: name}, function (err, users){
            if(err){
                res.send(err)
            }
            if(users!== null){
                return res.send({message:"already exists"})
            }
            else {
                
                user.save(function (err) {
                    if (err) {
                        res.send(err)
                    }
                    sendConfirm(user.name);
                    res.json(user.pass);
                })

                
            }
        })

         //  having a problem with this function
            
       /* User.find({name: name}, function(err, users){
            console.log(users.name);
            if(err){
                console.log(err)
            }
            if (users == null){
                
                user.save(function (err) {
                    if (err) {
                        res.send(err)
                    }
                    res.json(user.pass);
                })
            }
            else {
                return res.send({message: "This user already exists"})
            }
        })*/
        
// WI
});


//THIS FUNCTION WORKS, BUT HAVING AN ISSUE WITH WITH PASSING THE
function sendConfirm(clientName){
    console.log(clientName)
    //var host = 'localhost:8080';
    /*var verificationL = "https://"+host+"/verify"+verificationC;
    console.log(verificationL);*/
    var template = {
        to: clientName,
        subject: "Verify Email Please",
        html: "hello",
    }
    sender.sendMail(template);
    return true;
}

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
        // checks to see if the password made was correct
        var check = bcrypt.compareSync(pass, users.pass)
        if (check){
            if (users.verified === true){
                return res.send({message: "Site Manager User"}) // in the front end based on this message, it will complete certain actions
            }
            if (users.disabled === true){
                return res.send({message: "Disabled user"})
            }
            return res.send({message: "Logged In"})
            
        }
        else{
            return res.send({message: "Wrong Password"})
        }

    });

});




// register the route
app.use('/', router)


// listen
app.listen(port);
console.log(port);

