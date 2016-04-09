var knex = require('./knex');

module.exports = {
  getIndivContrib: function(cmte_id){
    return knex('indiv_contrib')
           .where({'cmte_id': cmte_id})
           .limit(100);
  }
}