var seeder = require('knex-csv-seeder').seeder.seed;

exports.seed = seeder({
  table: 'candidacy_statements',
  file: './data/Form2Filer.csv'
});