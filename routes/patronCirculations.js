const sql = require('../services/sql');

module.exports = app => {
  // option 1 last 30 days, 2 last 12 month
  app.get('/:libraryId/patrons/:option', function (req, res) {
      let query = "";
      switch(req.params.option) {
        case 'active': query = `SELECT  libraryId, month, year, sum(ActivePatrons) as count FROM ActivePatrons WHERE (MONTH > month(NOW()) AND YEAR = YEAR(NOW()) - 1 OR YEAR = YEAR(NOW())) and libraryID = ${req.params.libraryId} GROUP BY YEAR, MONTH ORDER BY YEAR DESC, MONTH DESC`; break;
        case 'new': query = `SELECT libraryId, month, year, SUM(PatronCount) as count FROM NewPatrons WHERE (MONTH > month(NOW()) AND YEAR = YEAR(NOW()) - 1 OR YEAR = YEAR(NOW())) and libraryID = 1062 GROUP BY YEAR, MONTH ORDER BY YEAR DESC, MONTH DESC`; break;
      }
      sql.run(query).then(data => {
        res.send(data);
      }).catch(err => {
        throw new Error(err);
      }); 
  });
};