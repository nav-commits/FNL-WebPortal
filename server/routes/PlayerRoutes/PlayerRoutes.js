const express = require('express');
const router = express.Router();
const Player = require('../../models/PlayersModel/PlayersModel');

router.post('/addPlayer', async (req, res) => {
    try {
        const newPlayer = await Player.create(req.body);
        res.json(newPlayer);
    } catch (error) {
        res.status(500).json({ error: 'Could not create player.' });
    }
});
router.get('/players', async (req, res) => {
    try {
        const findPlayers = await Player.find();
        res.json(findPlayers);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve players.' });
    }
});

router.get('/player/:id', async (req, res) => {
    try {
        const findPlayer = await Player.findById(req.params.id);
        res.json(findPlayer);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve player.' });
    }
}); 

router.delete('/deletePlayer/:id', async (req, res) => {
    try {
        const deletePlayer = await Player.findByIdAndDelete(req.params.id);
        res.json(deletePlayer);
    } catch (error) {
        res.status(500).json({ error: 'Could not delete player.' });
    }
});

router.put('/updatePlayer/:id', async (req, res) => {
    try {
        const updatePlayer = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatePlayer);
    } catch (error) {
        res.status(500).json({ error: 'Could not update player.' });
    }
});

module.exports = router;