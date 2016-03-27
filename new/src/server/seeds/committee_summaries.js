var seeder = require('knex-csv-seeder').seeder.seed;

exports.seed = seeder({
  table: 'committee_summaries',
  file: './data/committee_summaries.csv'
});