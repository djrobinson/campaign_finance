var seeder = require('knex-csv-seeder').seeder.seed;

exports.seed = seeder({
  table: 'campaign_cmte_rpts',
  file: './data/CampaignAndCommitteeSummaryAction.csv'
});