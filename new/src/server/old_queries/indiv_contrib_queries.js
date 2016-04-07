var knex = require('./knex');

function IndivContrib(){
  return knex('indiv_contrib');
}

module.exports = {
  getIndivContrib: function(){
    return IndivContrib().select().limit(10);
  }
};