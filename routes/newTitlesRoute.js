const sql = require('../services/sql');

module.exports = app => {
  // option 1 last 30 days, 2 last 12 month
  app.get('/:libraryId/newTitles', function (req, res) {
      let query = `SELECT isbn, title, service as servicetype, transactions FROM NewTitleCirculations WHERE libraryID = ${req.params.libraryId} ORDER BY transactions DESC`;
      sql.run(query).then(data => {
        res.send(data);
      }).catch(err => {
        throw new Error(err);
      }); 
  });
};