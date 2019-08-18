const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
const mongoose = require('mongoose');

var { Course } = require('../models/course');
var { Attendance } = require('../models/attendance');

router.get('/', (req, res, next) => {
    Attendance.find()
       .select("details username")
       .populate('details', 'fullname')
       .exec()
       .then(docs => {
           res.status(200).json({
               count: docs.length,
               atts: docs
           });
       })
       .catch(err => {
           res.status(500).json({
               error: err
           });
       });
});

/*router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Attendance.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Student details from courses : ' + JSON.stringify(err, undefined, 2)); }
    });
});*/


router.post('/', (req, res, next) => {
    const attendance = new Attendance({
        _id: mongoose.Schema.Types.ObjectId(),
        details: req.body.details,
        att_days: req.body.att_days
    });
    attendance
       .save()
       .then(result => {
           console.log(result);
           res.status(201).json(result);
       })
       .catch(err => {
           console.log(err);
           res.status(500).json({
               error: err
           });
       });
       
});

module.exports = router;