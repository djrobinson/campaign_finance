var knex = require('./knex');

module.exports = {
  getFirst: function(cmte_id){
    return knex('indiv_contrib')
            .select('CMTE_ID', 'NAME', 'TRANSACTION_AMT', 'TRAN_ID', 'EMPLOYER' )
            .where({'CMTE_ID': cmte_id})
            .orderBy('TRANSACTION_AMT', 'desc')
            .limit(10);
  },
  getGraphAsc: function(cmte_id){
    return knex('cmte_to_cmte')
            .innerJoin('committee_summaries', 'committee_summaries.com_id', 'cmte_to_cmte.CMTE_ID')
            .innerJoin('committee_master', 'cmte_to_cmte.CMTE_ID', 'committee_master.CMTE_ID')
            .select('cmte_to_cmte.OTHER_ID', 'cmte_to_cmte.CMTE_ID', 'committee_master.CMTE_NM', 'cmte_to_cmte.TRANSACTION_AMT', 'committee_summaries.cas_on_han_clo_of_per', 'committee_summaries.net_con', 'committee_summaries.tot_dis', 'committee_summaries.tot_rec', 'committee_summaries.lin_ima', 'committee_master.CMTE_DSGN', 'committee_master.CMTE_TP')
            .where({'cmte_to_cmte.OTHER_ID': cmte_id})
            .orderBy('committee_summaries.tot_rec', 'desc')
            .limit(10);
  },
  getMainDetails: function(cmte_id){
    return knex('committee_summaries')
            .innerJoin('committee_master', 'committee_summaries.com_id', 'committee_master.CMTE_ID')
            .select('committee_master.CMTE_NM', 'committee_master.CMTE_ID', 'committee_summaries.cas_on_han_clo_of_per', 'committee_summaries.net_con', 'committee_summaries.tot_dis', 'committee_summaries.tot_rec', 'committee_summaries.lin_ima', 'committee_master.CMTE_DSGN', 'committee_master.CMTE_TP')
            .where({'committee_master.CMTE_ID': cmte_id})
            .orderBy('committee_summaries.tot_rec', 'desc')
  },
  getSuperpacs: function(){
    return knex('committee_master')
            .innerJoin('committee_summaries', 'committee_summaries.com_id', 'committee_master.CMTE_ID')
            .select('committee_master.CMTE_ID', 'committee_master.CMTE_NM', 'committee_summaries.cas_on_han_clo_of_per', 'committee_summaries.tot_rec', 'committee_summaries.tot_dis', 'committee_summaries.tot_con', 'committee_summaries.lin_ima', 'committee_master.CMTE_DSGN', 'committee_master.CMTE_TP')
            .whereNotNull('committee_summaries.tot_rec', 'committee_summaries.tot_dis')
            .where('committee_master.CMTE_TP', 'O')
            .orderBy('committee_summaries.tot_rec', 'desc')
            .limit(200)

  },
  getExpSort: function(offset){
    return knex('independent_expenditures')
           .orderBy('exp_amo', 'desc')
           .limit(100)
           .offset(offset);
  },
  getIndExpendByCand: function(cand_id, offset){
    return knex('independent_expenditures')
           .where({'can_id': cand_id})
           .orderBy('exp_amo', 'desc')
           .limit(100)
           .offset(offset);
  },
  getAllIndExpendByCand: function(cand_id, offset){
    return knex('independent_expenditures')
           .where({'can_id': cand_id})
           .andWhere('exp_amo', '>', 100000)
           .offset(offset);
  },
  getAllIndExpendByCandChrome: function(cand_id, offset){
    return knex('independent_expenditures')
           .where({'can_id': cand_id})
           .andWhere('exp_amo', '>', 1000)
           .offset(offset);
  },
  getIndExpendByComm: function(cmte_id, offset){
    return knex('independent_expenditures')
           .where({'spe_id': cmte_id})
           .orderBy('exp_amo', 'desc')
           .limit(100)
           .offset(offset);
  },
  getSuppByCand: function(cand_id, offset){
    return knex('independent_expenditures')
           .where({'can_id': cand_id, 'sup_opp': 'Support'})
           .limit(100)
           .offset(offset);
  },
  getOppByCand: function(cand_id, offset){
    return knex('independent_expenditures')
           .where({'can_id': cand_id, 'sup_opp': 'Oppose'})
           .limit(100)
           .offset(offset);
  },
  getSuppByCmte: function(cmte_id, offset){
    return knex('independent_expenditures')
           .where({'spe_id': cmte_id, 'sup_opp': 'Support'})
           .limit(100)
           .offset(offset);
  },
  sumOppByCand: function(cand_id){
    return knex('independent_expenditures')
            .sum('exp_amo as total')
            .where({'can_id': cand_id, 'sup_opp': 'Oppose'});
  },
  sumSuppByCand: function(cand_id){
    return knex('independent_expenditures')
            .sum('exp_amo as total')
            .where({'can_id': cand_id, 'sup_opp': 'Support'});
  },
  getOppByCmte: function(cmte_id, offset){
    return knex('independent_expenditures')
           .where({'spe_id': cmte_id, 'sup_opp': 'Oppose'})
           .limit(100)
           .offset(offset);
  },
  groupedCat: function(){
    return knex('independent_expenditures')
           .select('pur')
           .sum('exp_amo')
           .groupBy('pur')
           .orderBy('sum', 'desc');
  },
  candExpByCat: function(cand_id){
    return knex('independent_expenditures')
           .where({'can_id': cand_id})
           .select('pur')
           .sum('exp_amo')
           .groupBy('pur')
           .orderBy('sum', 'desc');
  }
}