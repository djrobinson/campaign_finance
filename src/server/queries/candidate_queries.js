var knex = require('./knex');


module.exports = {
   getCandSum: function(cand_id){
    return knex('candidacy_statements')
           .innerJoin('candidate_summaries', 'CANDIDATE_ID', 'can_id')
           .where({'can_id': cand_id});
  },

  getGraphAsc: function(cand_id){
    return knex('cmte_cand_linkage')
            .innerJoin('committee_master', 'committee_master.CMTE_ID', 'cmte_cand_linkage.CMTE_ID')
            .select('cmte_cand_linkage.CAND_ID', 'cmte_cand_linkage.CMTE_ID', 'committee_master.CMTE_NM')
            .where({'cmte_cand_linkage.CAND_ID': cand_id});
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
           .limit(100)
           .offset(offset);
  },

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
