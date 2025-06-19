const express = require('express');
const app = express();
app.get('/', (_, res) => res.send('It works!'));
app.listen(5001, () => console.log(' http://localhost:5001'));
