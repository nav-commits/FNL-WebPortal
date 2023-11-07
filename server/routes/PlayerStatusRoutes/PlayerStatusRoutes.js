const express = require('express');
const router = express.Router();
const playerStatus = require('../../models/PlayerStatus/PlayerStatus');

router.post('/addPlayerStatus', async (req, res) => {
    try {
        const newPlayer = await playerStatus.create(req.body);
        res.json(newPlayer);
    } catch (error) {
        res.status(500).json({ error: 'Could not create player.' });
    }
});
router.get('/status', async (req, res) => {
    try {
        const findPlayers = await playerStatus.find();
        res.json(findPlayers);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve players.' });
    }
});

module.exports = router;
