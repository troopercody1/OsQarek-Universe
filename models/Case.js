const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
    id: Number,
    type: String,
    user: String,
    userId: String,
    reason: String,
    moderator: String,
    timestamp: Date
});

module.exports = mongoose.model('Case', caseSchema);
