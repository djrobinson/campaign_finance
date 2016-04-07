var knex = require('./knex');

function CommReg(){
  return knex('committee_registrations');
}

module.exports = {
  getCommReg: function(){
    return CommReg().select().limit(10);
  }
};