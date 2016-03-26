var seeder = require('knex-csv-seeder').seeder.seed;

exports.seed = seeder({
  table: 'cmte_cand_linkage',
  file: './data/cmte_cand_link.csv'
});