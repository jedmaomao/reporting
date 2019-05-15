const express = require('express');
const path = require('path');
const app = express();

const absolutePath = path.join(__dirname, './static')
app.use(express.static(absolutePath));

app.get('/:id(\\d+)/', function (req, res) {
  res.sendFile(path.join(absolutePath, "/index.html"));
});

require('./routes/circulationsRoute')(app);


app.listen(300, () => {
  console.log('Sever is up on port 300.');
});

