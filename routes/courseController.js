const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Course } = require('../models/course');

router.post('/', (req, res) => {
    var course = new Course({
        course: req.body.course,
        username: req.body.username,
        fullname: req.body.fullname,
        email: req.body.email
    });
    course.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Course Save : ' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;