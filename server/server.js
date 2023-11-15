const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const port = 5001;
const cors = require('cors');

const uri = process.env.MONGODB_URI;

const playerRoute = require('./routes/PlayerRoutes/PlayerRoutes');
const gameRoute = require('./routes/GameRoutes/GameRoutes');
const playerStatusRoute = require('./routes/PlayerStatusRoutes/PlayerStatusRoutes');

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
app.use('/playerStatus', playerStatusRoute);

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
};
app.use(cors(corsOptions));

app.listen(port, () => {
    console.log(`Node.js server is running on port ${port}`);
});
