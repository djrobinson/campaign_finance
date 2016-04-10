var seeder = require('knex-csv-seeder').seeder.seed;

exports.seed = seeder({
  table: 'indiv_contrib',
  file: './data/indiv_contrib.csv'
});
