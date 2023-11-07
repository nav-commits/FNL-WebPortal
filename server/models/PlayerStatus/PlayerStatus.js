const mongoose = require('mongoose');

const playerStatusSchema = new mongoose.Schema({
    monthToMonth: {
        id: String,
        name: String,
        players: Array,
    },
    weekToWeek: {
        id: String,
        name: String,
        players: Array,
    },
    IR: {
        id: String,
        name: String,
        players: Array,
    },
    fiftyFifty: {
        id: String,
        name: String,
        players: Array,
    },

    createdAt: {
        type: Date,
        default: Date.now, // Set the default value to the current date and time
    },
});

module.exports = mongoose.model('playerStatus', playerStatusSchema);
