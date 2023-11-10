const mongoose = require('mongoose');
const gameSchema = new mongoose.Schema({
   
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
        createdAt: {
            type: Date,
            default: Date.now, // Set the default value to the current date and time
        },
    
});


module.exports = mongoose.model('Game', gameSchema);
