const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const port = 5000;

const uri = process.env.MONGODB_URI;
const Player = require('./PlayersModel/PlayersModel');
const Game = require('./GameModel/GameModel');

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


//  players route

app.post('/addPlayer', async (req, res) => {
    try {
        const newPlayer = await Player.create(req.body);
        res.json(newPlayer);
    } catch (error) {
        res.status(500).json({ error: 'Could not create player.' });
    }
});
app.get('/players', async(req, res) => {
  try {
    const findPlayers = await Player.find();
    res.json(findPlayers);
  }
    catch(error) {
        res.status(500).json({ error: 'Could not retrieve players.' });
    }
});

app.delete('/deletePlayer/:id', async (req, res) => {
    try {
        const deletePlayer = await Player.findByIdAndDelete(req.params.id);
        res.json(deletePlayer);
    } catch (error) {
        res.status(500).json({ error: 'Could not delete player.' });
    }
})

app.put('/updatePlayer/:id', async (req, res) => {
    try {
        const updatePlayer = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatePlayer);
    }
    catch (error) {
        res.status(500).json({ error: 'Could not update player.' });
    }
})

app.listen(port, () => {
    console.log(`Node.js server is running on port ${port}`);
});
