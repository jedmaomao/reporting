const sql = require('../services/sql');

module.exports = app => {
  // option 1 last 30 days, 2 last 12 month
  app.get('/:libraryId/circulations/:option', function (req, res) {
      let query = "";
      switch(req.params.option) {
        case 'last30Days': query = `SELECT LibraryID, DATE_FORMAT(DATE,'%m/%d') as DATE, Service, SUM(Transactions) AS Transactions FROM Circulations WHERE Date BETWEEN NOW() - INTERVAL 30 DAY AND NOW() AND LibraryID = ${req.params.libraryId} group BY Date, Service ORDER BY DATE DESC`; break;
        case 'last12Months': query = `SELECT  LibraryID, DATE_FORMAT(DATE,'%M, %y') as Month, Service, SUM(Transactions) AS Transactions from Circulations where DATE > DATE_SUB(now(), INTERVAL 12 MONTH) AND libraryID = ${req.params.libraryId} GROUP BY DATE_FORMAT(DATE,'%Y-%m') DESC, Service`; break;
        case 'top': query = `SELECT isbn, title, SUM(TRANSACTIONS) AS transaction FROM CirculationsByTitle where date BETWEEN CURDATE() - INTERVAL 60 DAY AND CURDATE() AND libraryID = ${req.params.libraryId} GROUP BY ISBN ORDER BY TRANSACTION DESC`; break;
      }
      sql.run(query).then(data => {
        res.send(data);
      }).catch(err => {
        throw new Error(err);
      }); 
  });

  

};