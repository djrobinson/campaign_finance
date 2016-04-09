var knex = require('./knex');

module.exports = {
  getDisbursements: function(cand_id){
    return knex('candidate_disbursements')
          .where({'can_id': cand_id})
          .limit(100);
  }
};