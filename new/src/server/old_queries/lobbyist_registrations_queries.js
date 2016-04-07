var knex = require('./knex');

function LobbReg(){
  return knex('lobbyist_registrations');
}

module.exports = {
  getLobbReg: function(){
    return LobbReg().select().limit(10);
  }
};