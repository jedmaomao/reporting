const express = require('express');
const path = require('path');
const app = express();
const keys = require('./config/key');

const absolutePath = path.join(__dirname, './static')
app.use(express.static(absolutePath));

app.get('/:id(\\d+)/', function (req, res){
  res.sendFile(path.join(absolutePath, "/index.html"));
});

app.listen(300, () => {
  console.log('Sever is up on port 300.');
});

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : keys.host,
  user     : keys.user,
  password : keys.password,
  port: keys.port,
  database: keys.database
});

connection.connect();

connection.query("SELECT LibraryID, month(Date) AS Month, Service, SUM(Transactions) AS Transactions from Circulations where YEAR(Date) = 2018 AND libraryID = 1062 group by MONTH(DATE), Service order by MONTH(Date)", function (error, results, fields) {
  if (error) console.log(error);
  console.log('The solution is: ', results[0].Service);
});

