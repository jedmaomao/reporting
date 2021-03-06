const express = require('express');
const path = require('path');
const app = express();

const absolutePath = path.join(__dirname, './static')
app.use(express.static(absolutePath));

app.get('/:id(\\d+)/', function (req, res) {
  res.sendFile(path.join(absolutePath, "/index.html"));
});

require('./routes/circulationsRoute')(app);
require('./routes/patronRoute')(app);
require('./routes/expiringTitlesRoute')(app)
require('./routes/newTitlesRoute')(app)
require('./routes/holdsRoute')(app)

app.listen(3000, () => {
  console.log('Sever is up on port 3000.');
});

