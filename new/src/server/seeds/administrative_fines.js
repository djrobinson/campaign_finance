var seeder = require('knex-csv-seeder').seeder.seed;

exports.seed = seeder({
  table: 'administrative_fines',
  file: './data/AdminFineAction.csv'
});
