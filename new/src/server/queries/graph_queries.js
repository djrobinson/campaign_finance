var knex = require('./knex');

module.exports = {
  getTopCom: function(cmte){
    return knex('cmte_to_cmte')
            .select('CMTE_ID', 'OTHER_ID', 'TRANSACTION_AMT')
            .where({'CMTE_ID': cmte.CMTE_ID})
            .orderBy('TRANSACTION_AMT', 'desc')
            .limit(5);
  }
}