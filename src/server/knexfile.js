
module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/campaign_finances'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }
};
