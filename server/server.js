const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const port = 5000;

const uri = process.env.MONGODB_URI;
;
const Game = require('./models/GameModel/GameModel');
const playerRoute = require('./routes/PlayerRoutes/PlayerRoutes');
const gameRoute = require('./routes/GameRoutes/GameRoutes');

// database connection
async function connect() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB');
    }
}

connect();

 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(bodyParser.json());

app.use('/players', playerRoute);
app.use('/games', gameRoute);
 

app.listen(port, () => {
    console.log(`Node.js server is running on port ${port}`);
});
