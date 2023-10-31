const express = require('express');
const app = express();
const port = 5000;

app.get('/api', (req, res) => {
    res.json({ message: 'Hello from Node.js server!' });
});

app.listen(port, () => {
    console.log(`Node.js server is running on port ${port}`);
});
