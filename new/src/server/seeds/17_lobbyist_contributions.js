var seeder = require('knex-csv-seeder').seeder.seed;

exports.seed = seeder({
  table: 'lobbyist_contributions',
  file: './data/lobbyist_contributions.csv'
});