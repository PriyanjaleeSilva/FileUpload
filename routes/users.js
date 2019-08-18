const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
  //check username exists
  User.find({ username: req.body.username})
     .exec()
     .then(user => {
       if (user.length >= 1) {
         //return res.status(409).json({
           //message: 'Username exists'
           //console.log('Username exists');
           res.json({usernamenotsuccess: true, msg:'username already exists'});
         }

        else {

         //check email exists
         User.find({ email: req.body.email})
            .exec()
            .then(user => {
              if (user.length >= 1) {
                  res.json({emailnotsuccess: true, msg:'email already exists'});
                }

               else{
                 let newUser = new User({
                   role: req.body.role,
                   name: req.body.name,
                   email: req.body.email,
                   username: req.body.username,
                   password: req.body.password
                 });

                 User.addUser(newUser, (err, user) => {
                   if(err){
                     res.json({success: false, msg:'Failed to register user'});
                   } else {
                     res.json({success: true, msg:'User registered'});
                   }
                 });
               }

     });
   }

 });
 })



// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role
          }
        });
      } else {
        return res.json({success: false, msg: 'wrong password'});
      }
    });
  });
});

// Student Dashboard
/*router.get('/student_dashboard', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});*/

router.get('/student_dashboard', function(req, res){
  res.render('student_dashboard', { username: req.user.username});
});

module.exports = router;
