var seeder = require('knex-csv-seeder').seeder.seed;

exports.seed = seeder({
  table: 'cmte_to_cand',
  file: './data/cmte_to_cand.csv'
});