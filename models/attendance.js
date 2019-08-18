const mongoose = require('mongoose');

var Attendance = mongoose.model('Attendance', {
    _id: mongoose.Schema.Types.ObjectId,
    details: { type: mongoose.Schema.Types.ObjectId, ref: 'Marks', required: true },
    att_days: { type: Number }
    
});

module.exports = { Attendance };