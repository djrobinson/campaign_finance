var seeder = require('knex-csv-seeder').seeder.seed;

exports.seed = seeder({
  table: 'elec_communications',
  file: './data/elec_communications.csv'
});
