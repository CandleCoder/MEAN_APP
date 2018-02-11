var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://manikantupadhyay:1234@ds231658.mlab.com:31658/developer', ['users'])

//Get all users
router.get('/users', function(req, res, next){
    db.users.find(function(err, users){
        if(err) {
            res.send(err);
        }
        res.json(users);
    });
});

//Get single user
router.get('/users/:id', function(req, res, next){
    db.users.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, user){
        if(err) {
            res.send(err);
        }
        res.json(user);
    });
});

//save user
router.post('/users', function(req, res, next){
    var user = req.body;
    if(!user.title || (user.isRegistered + '')){
        res.status(400);
        res.json({
            "Error" : "Bad Data"
        });
    } else {
        db.users.save(user, function(err, user){
            if(err) {
                res.send(err);
            }
            res.json(user);
        });
    }
});

//Delete user
router.delete('/users/:id', function(req, res, next){
    db.users.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, user){
        if(err) {
            res.send(err);
        }
        res.json(user);
    });
});

//update user
router.delete('/users/:id', function(req, res, next){
    var user = req.body;
    var updatedUser = {};

    if(user.isRegistered) {
        updatedUser.isRegistered = user.isRegistered;
    }
    if(user.title) {
        updatedUser.title = user.title;
    }
    if(!updatedUser) {
        res.status(400);
        res.json({
            "Error" : "Bad Data"
        });
    }
    else {
        db.users.remove({_id: mongojs.ObjectId(req.params.id)}, updatedUser, {},  function(err, user){
            if(err) {
                res.send(err);
            }
            res.json(user);
        });
    }
});


module.exports = router;