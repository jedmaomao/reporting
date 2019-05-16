const mysql = require('mysql');
const keys = require('./config/key');


var pool  = mysql.createPool({
    connectionLimit : 10,
    host     : keys.host,
    user     : keys.user,
    password : keys.password,
    port: keys.port,
    database: keys.database
  });

  pool.getConnection(function(error, connection) {
      if (error) {
          console.log(error);
      }
      console.log(connection);
      const query = true ? `SELECT LibraryID, DATE_FORMAT(DATE,'%m/%d') as DATE, Service, SUM(Transactions) AS Transactions FROM Circulations WHERE Date BETWEEN NOW() - INTERVAL 30 DAY AND NOW() AND LibraryID = 1062 group BY Date, Service ORDER BY DATE DESC` : `SELECT  LibraryID, DATE_FORMAT(DATE,'%M, %y') as Month, Service, SUM(Transactions) AS Transactions from Circulations where DATE > DATE_SUB(now(), INTERVAL 12 MONTH) AND libraryID = 1062 GROUP BY DATE_FORMAT(DATE,'%Y-%m') DESC, Service`;

      connection.query(query, function (error, results,) {
        // When done with the connection, release it.
        connection.release();
     
        // Handle error after the release.
        if (error) return error;
       console.log(results);
     
        // Don't use the connection here, it has been returned to the pool.
      });

  });