const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Notice } = require('../models/notice');

router.get('/', (req, res) => {
    Notice.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Notices : ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Notice.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Notice : ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var ntc = new Notice({
        course: req.body.course,
        date: req.body.date,
        notice: req.body.notice
    });
    ntc.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Notice Save : ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var ntc = {
        course: req.body.course,
        date: req.body.date,
        notice: req.body.notice
    };
    Notice.findByIdAndUpdate(req.params.id, { $set: ntc }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Notice Update : ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Notice.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Notice Delete : ' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;