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
    }
});

module.exports = mongoose.model('Game', gameSchema);
