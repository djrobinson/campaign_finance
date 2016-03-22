var seeder = require('knex-csv-seeder').seeder.seed;

exports.seed = seeder({
  table: 'candidate_disbursements',
  file: './data/all_house_senate.csv'
});
