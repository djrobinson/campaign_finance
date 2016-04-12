var knex = require('./knex');


module.exports = {
   getCandSum: function(cand_id){
    return knex('candidacy_statements')
           .innerJoin('candidate_summaries', 'CANDIDATE_ID', 'can_id')
           .where({'can_id': cand_id});
  },

  getAssocCommittees: function(cand_id){
    return knex('cmte_cand_linkage')
            .select().where({'CAND_ID': cand_id});
  },

  getCandSort: function(column){
    return knex('candidacy_statements')
           .innerJoin('candidate_summaries', 'CANDIDATE_ID', 'can_id')
           .orderBy(column, 'desc')
           .limit(100);
  },

  getCandSumLimit: function(limit){
    if (!limit) { limit = 100; }
    return knex('candidacy_statements')
           .innerJoin('candidate_summaries', 'CANDIDATE_ID', 'can_id')
           .orderBy('net_con', 'desc')
           .limit(limit);
  },

  getCandSumByOffice: function(office){
    return knex('candidacy_statements')
           .innerJoin('candidate_summaries', 'CANDIDATE_ID', 'can_id')
           .where({'CANDIDATE_OFFICE_CODE': office})
           .limit(100);
  },

  getCandByOffSort: function(office, col){
    return knex('candidacy_statements')
           .innerJoin('candidate_summaries', 'CANDIDATE_ID', 'can_id')
           .where({'CANDIDATE_OFFICE_CODE': office})
           .orderBy(col, 'desc')
           .limit(100);
  },

  searchCand: function(cand){
    return knex('candidacy_statements')
           .innerJoin('candidate_summaries', 'CANDIDATE_ID', 'can_id')
           .where('CANDIDATE_NAME', 'like', '%'+cand+'%')
           .limit(100);
  }
};
