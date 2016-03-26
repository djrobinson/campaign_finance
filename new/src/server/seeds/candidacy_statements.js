var seeder = require('knex-csv-seeder').seeder.seed;

exports.seed = seeder({
  table: 'candidate_master',
  file: './data/candidate_master.csv'
});