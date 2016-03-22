var seeder = require('knex-csv-seeder').seeder.seed;
exports.seed = seeder({
  table: 'candidate_summaries',
  file: './data/CandidateSummaryAction.csv'
});
