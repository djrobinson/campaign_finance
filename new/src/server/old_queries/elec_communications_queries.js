var knex = require('./knex');

function ElecComm(){
  return knex('elec_communications');
}

module.exports = {
  getElecComm: function(){
    return ElecComm().select().limit(10);
  }
};