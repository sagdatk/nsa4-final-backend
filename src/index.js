const express = require('express');
const cors = require("cors");

const app = express();

app.use(express.json())
app.use(cors())

const tests = require('./api/tests');

app.use('/api/tests/', tests);

app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));

const port = 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));