var seeder = require('knex-csv-seeder').seeder.seed;

exports.seed = seeder({
  table: 'independent_expenditures',
  file: './data/independent-expenditure.csv'
});