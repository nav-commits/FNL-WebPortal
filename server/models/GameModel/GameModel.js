const mongoose = require('mongoose');
const gameSchema = new mongoose.Schema({
    game: {
        teamWhite: {
            Team: String,
            players: [{}],
            goalie: String,
        },
        teamBlack: {
            Team: String,
            players: [{}],
            goalie: String,
        },
        irAndOut: {
            Team: String,
            players: [{}],
        },
        monthToMonth: {
            Team: String,
            players: [{}],
        },
        weekToWeek: {
            Team: String,
            players: [{}],
        },
        createdAt: {
            type: Date,
            default: Date.now, // Set the default value to the current date and time
        },
    },
});


module.exports = mongoose.model('Game', gameSchema);
