const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;


var { Marks } = require('../models/marks');

router.post('/', (req, res) => {
    var marks = new Marks({
        course: req.body.course,
        fullname: req.body.fullname,
        username: req.body.username,
        marks: req.body.marks
    });
    marks.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Marks Save : ' + JSON.stringify(err, undefined, 2)); }
    });
})



router.get('/', (req, res) => {
    Marks.find({course:"Phython"},(err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Marks : ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/javaforbeginners', (req, res) => {
    Marks.find({course:"Java for Beginners"},(err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Marks : ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/c', (req, res) => {
    Marks.find({course:"C"},(err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Marks : ' + JSON.stringify(err, undefined, 2)); }
    });
});

/*
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Marks.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Student details from marks : ' + JSON.stringify(err, undefined, 2)); }
    });
});*/

module.exports = router;