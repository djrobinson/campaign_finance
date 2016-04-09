var knex = require('./knex');

module.exports = {
  getCmteCmteByDon: function(cmte_id){
    return knex('cmte_to_cmte')
           .where({'CMTE_ID': cmte_id})
           .limit(100);
  },
  getCmteCmteByRec: function(cmte_id){
    return knex('cmte_to_cmte')
           .where({'OTHER_ID': cmte_id})
           .limit(100);
  }
}