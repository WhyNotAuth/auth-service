const express = require('express');
const app = express();
const port = 3000;

app.get('/health', (req, res) => res.json({
   "status": "ok"
}));

app.get('/', (req, res) => res.send('what...'));

app.listen(port, () => console.log(`Listening on ${port}`));