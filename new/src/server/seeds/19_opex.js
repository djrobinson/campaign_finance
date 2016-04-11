var seeder = require('knex-csv-seeder').seeder.seed;

exports.seed = seeder({
  table: 'opex',
  file: './data/opex.csv'
});