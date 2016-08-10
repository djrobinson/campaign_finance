var knex = require('./knex');

module.exports = {
  getTopCom: function(cmte){
    return knex('cmte_to_cmte')
            .innerJoin('committee_summaries', 'committee_summaries.com_id', 'cmte_to_cmte.OTHER_ID')
            .innerJoin('committee_master', 'committee_master.CMTE_ID', 'cmte_to_cmte.OTHER_ID')
            .select('cmte_to_cmte.CMTE_ID', 'cmte_to_cmte.OTHER_ID', 'cmte_to_cmte.TRANSACTION_AMT', 'committee_summaries.cas_on_han_clo_of_per', 'committee_summaries.net_con', 'committee_summaries.tot_dis', 'committee_master.CMTE_TP', 'committee_master.CMTE_NM', 'cmte_to_cmte.IMAGE_NUM')
            .where({'cmte_to_cmte.CMTE_ID': cmte.CMTE_ID})
            .where('TRANSACTION_TP', 'LIKE', '1%')
            .orderBy('cmte_to_cmte.TRANSACTION_AMT', 'desc')
            .limit(25);
  },
  getTopComSecondary: function(cmte){
    return knex('cmte_to_cmte')
            .innerJoin('committee_master', 'committee_master.CMTE_ID', 'cmte_to_cmte.OTHER_ID')
            .select('cmte_to_cmte.CMTE_ID', 'cmte_to_cmte.OTHER_ID', 'cmte_to_cmte.TRANSACTION_AMT', 'committee_master.CMTE_NM', 'cmte_to_cmte.IMAGE_NUM', 'committee_master.CMTE_TP')
            .where({'cmte_to_cmte.CMTE_ID': cmte.OTHER_ID})
            .where('TRANSACTION_TP', 'LIKE', '1%')
            .orderBy('cmte_to_cmte.TRANSACTION_AMT', 'desc')
            .limit(10);
  },
  getTopInd: function(cmte){
    return knex('indiv_contrib')
            .select('CMTE_ID', 'NAME', 'TRANSACTION_AMT', 'TRAN_ID', 'EMPLOYER' )
            .where({'CMTE_ID': cmte.OTHER_ID})
            .orderBy('TRANSACTION_AMT', 'desc')
            .limit(10);
  }
};