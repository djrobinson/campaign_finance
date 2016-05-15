var seeder = require('knex-csv-seeder').seeder.seed;

exports.seed = seeder({
  table: 'candidate_disbursements',
  file: './data/candidate_disbursements.csv'
});
