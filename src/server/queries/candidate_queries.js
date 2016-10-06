var knex = require('./knex');


module.exports = {
   getCandSum: function(cand_id){
    return knex('candidacy_statements')
           .innerJoin('candidate_summaries', 'CANDIDATE_ID', 'can_id')
           .where({'can_id': cand_id});
  },

  getGraphAsc: function(cand_id){
    return knex('cmte_cand_linkage')
            .innerJoin('committee_summaries', 'committee_summaries.com_id', 'cmte_cand_linkage.CMTE_ID')
            .innerJoin('committee_master', 'cmte_cand_linkage.CMTE_ID', 'committee_master.CMTE_ID')
            .select('cmte_cand_linkage.CAND_ID', 'cmte_cand_linkage.CMTE_ID', 'committee_master.CMTE_NM', 'committee_summaries.cas_on_han_clo_of_per', 'committee_summaries.net_con', 'committee_summaries.tot_dis', 'committee_summaries.tot_rec', 'committee_summaries.lin_ima', 'committee_master.CMTE_DSGN', 'committee_master.CMTE_TP')
            .where({'cmte_cand_linkage.CAND_ID': cand_id})
            .orderBy('committee_summaries.tot_rec', 'desc');
  },
  getAssocCommittees: function(cand_id){
    return knex('cmte_cand_linkage')
            .select().where({'CAND_ID': cand_id});
  },
  getCandSort: function(column, offset){
    return knex('candidacy_statements')
           .innerJoin('candidate_summaries', 'CANDIDATE_ID', 'can_id')
           .orderBy(column, 'desc')
           .limit(100)
           .offset(offset);
  },

  getCandMaster: function(cand_id){
    return knex('campaign_cmte_rpts')
            .select()
            .where({'can_id': cand_id});
  },

  getCandSumLimit: function(limit, offset){
    if (!limit) { limit = 100; }
    return knex('candidacy_statements')
           .innerJoin('candidate_summaries', 'CANDIDATE_ID', 'can_id')
           .orderBy('net_con', 'desc')
           .limit(limit)
           .offset(offset);
  },

  getCandSumByOffice: function(office, offset){
    return knex('candidacy_statements')
           .innerJoin('candidate_summaries', 'CANDIDATE_ID', 'can_id')
           .where({'CANDIDATE_OFFICE_CODE': office})
           .whereRaw('tot_rec IS NOT NULL')
           .orderBy('tot_rec', 'desc')
           .offset(offset);
  },

  //select "can_id" from candidate_summaries where "can_id" LIKE 'P%' AND "net_con" IS NOT NULL order by "tot_con" desc limit 100

  getCandByOffSort: function(office, col, offset){
    return knex('candidacy_statements')
           .innerJoin('candidate_summaries', 'CANDIDATE_ID', 'can_id')
           .where({'CANDIDATE_OFFICE_CODE': office})
           .orderBy(col, 'desc')
           .limit(100)
           .offset(offset);
  },

  searchCand: function(cand, offset){
    return knex('candidacy_statements')
           .innerJoin('candidate_summaries', 'CANDIDATE_ID', 'can_id')
           .where('CANDIDATE_NAME', 'like', '%'+cand+'%')
           .limit(100)
           .offset(offset);
  }
};
