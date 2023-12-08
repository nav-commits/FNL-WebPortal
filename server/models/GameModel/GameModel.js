const mongoose = require('mongoose');
const gameSchema = new mongoose.Schema({
    teamWhite: {
        Team: String,
        players: [{}],
    },
    teamBlack: {
        Team: String,
        players: [{}],
    },
    createdAt: {
        type: Date,
        default: Date.now, // Set the default value to the current date and time
    },
    seriesWinner: {
        winner: String,
    },
});

module.exports = mongoose.model('Game', gameSchema);
