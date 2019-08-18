const mongoose = require('mongoose');

var Course = mongoose.model('Course', {
    course: { type: String },
    username: { type: String },
    fullname: { type: String },
    email: { type: String },
    
});

module.exports = { Course };