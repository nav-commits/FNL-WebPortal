const express = require('express');
const router = express.Router();
const Game = require('../../models/GameModel/GameModel');

router.post('/Game', async (req, res) => {
    try {
        const newGame = await Game.create(req.body);
        res.json(newGame);
    } catch (error) {
        res.status(500).json({ error: 'Could not create game.' });
    }
});
router.get('/Game/:id', async (req, res) => {
    try {
        const findGame = await Game.findById(req.params.id);
        res.json(findGame);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve game.' });
    }
})
router.get('/Games', async (req, res) => {
    try {
        const findGames = await Game.find();
        res.json(findGames);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve games.' });
    }
});
router.put('/updateGame/:id', async (req, res) => {
    try {
        const updateGame = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updateGame);
    }
    catch (error) {
        res.status(500).json({ error: 'Could not update game.' });
    }
})

router.delete('/deleteGame/:id', async (req, res) => {
    try {
        const deleteGame = await Game.findByIdAndDelete(req.params.id);
        res.json(deleteGame);
    } catch (error) {
        res.status(500).json({ error: 'Could not delete game.' });
    }
})

module.exports = router;
