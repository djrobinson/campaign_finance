var seeder = require('knex-csv-seeder').seeder.seed;

exports.seed = seeder({
  table: 'lobbyist_registrations',
  file: './data/lobbyist_registrations.csv'
});