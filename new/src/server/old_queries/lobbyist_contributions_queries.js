var knex = require('./knex');

function LobbContrib(){
  return knex('lobbyist_contributions');
}

module.exports = {
  getLobbContrib: function(){
    return LobbContrib().select().limit(10);
  }
};