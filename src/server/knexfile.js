
module.exports = {

  development: {
    client: 'pg',
    // connection: 'postgres://localhost/campaign_finances'
    connection: process.env.PSQL_CONNECTION
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }
};
