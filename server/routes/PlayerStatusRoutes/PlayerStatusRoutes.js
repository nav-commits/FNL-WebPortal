const express = require('express');
const router = express.Router();
const playerStatus = require('../../models/PlayerStatus/PlayerStatus');

router.post('/addPlayerStatus', async (req, res) => {
    try {
        const addStatus = await playerStatus.create(req.body);
        res.json(addStatus);
    } catch (error) {
        res.status(500).json({ error: 'Could not create status.' });
    }
});
router.get('/status', async (req, res) => {
    try {
        const findPlayersStatus = await playerStatus.find();
        res.json(findPlayersStatus);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve statuses.' });
    }
});

router.get('/status/:id', async (req, res) => {
    try {
        const findPlayerStatusById = await playerStatus.findById(req.params.id);
        res.json(findPlayerStatusById);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve a status.' });
    }
});


router.put('/status/:id', async (req, res) => {
    try {
        const updatePlayersStatus = await playerStatus.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatePlayersStatus);
    } catch (error) {
        res.status(500).json({ error: 'Could not update status.' });
    }
})

module.exports = router;
