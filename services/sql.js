const mysql = require('mysql');
const keys = require('../config/key');


var pool  = mysql.createPool({
    connectionLimit : 10,
    host     : keys.host,
    user     : keys.user,
    password : keys.password,
    port: keys.port,
    database: keys.database
  });

const run = (query) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(error, connection) {
            if (error) reject(error); // not connected!
           
            // Use the connection
            connection.query(query, function (error, results,) {
              // When done with the connection, release it.
              connection.release();
           
              // Handle error after the release.
              if (error) reject(error);
              resolve(results);
           
              // Don't use the connection here, it has been returned to the pool.
            });
        });
    });
};
module.exports = {
    run : run
};