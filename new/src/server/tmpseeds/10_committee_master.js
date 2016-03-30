var seeder = require('knex-csv-seeder').seeder.seed;

exports.seed = seeder({
  table: 'committee_master',
  file: './data/committee_master.csv'
});
