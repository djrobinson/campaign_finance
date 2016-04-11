var seeder = require('knex-csv-seeder').seeder.seed;

exports.seed = seeder({
  table: 'committee_registrations',
  file: './data/committee_registrations.csv'
});