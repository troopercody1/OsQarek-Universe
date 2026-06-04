const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    offences: { type: Number, default: 0 },
    staffStrikes: { type: Number, default: 0 },
    notes: [{
        note: String, 
        mod: String,
        createdAt: { type: Date, default: Date.now }
    }]
});

module.exports = mongoose.model('User', userSchema);
