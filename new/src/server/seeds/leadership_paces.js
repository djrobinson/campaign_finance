var seeder = require('knex-csv-seeder').seeder.seed;

exports.seed = seeder({
  table: 'leadership_pacs',
  file: './data/leadership_pacs.csv'
});
