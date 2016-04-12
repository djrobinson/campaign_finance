var knex = require('./knex');

module.exports = {
  getDistOrder: function(){
    return knex('candidate_disbursements')
          .orderBy('dis_amo', 'desc')
          .limit(100);
  },
  getDisbByCand: function(cand_id){
    return knex('candidate_disbursements')
          .where({'can_id': cand_id})
          .orderBy('dis_amo', 'desc')
          .limit(100);
  },
  getByRec: function(rec_nam){
    return knex('candidate_disbursements')
           .where({'rec_nam': rec_nam})
           .orderBy('dis_amo', 'desc')
           .limit(100);
  },
  getByCode: function(cat_cod){
    return knex('candidate_disbursements')
           .where({'cat_cod': cat_cod})
           .orderBy('dis_amo', 'desc')
           .limit(100);
  },
  aggByType: function(cand_id){
    return knex('candidate_disbursements')
           .select('cat_des')
           .where({'can_id': cand_id})
           .sum('dis_amo')
           .groupBy('cat_des')
           .orderBy('sum', 'desc')
  },
  aggByPurp: function(cand_id){
    return knex('candidate_disbursements')
           .select('dis_pur_des')
           .where({'can_id': cand_id})
           .sum('dis_amo')
           .groupBy('dis_pur_des')
           .orderBy('sum', 'desc')
  },
  typeTotals: function(){
    return knex('candidate_disbursements')
           .select('cat_des')
           .sum('dis_amo')
           .groupBy('cat_des')
           .orderBy('sum', 'desc')
  },
  purpTotals: function(){
        return knex('candidate_disbursements')
           .select('dis_pur_des')
           .sum('dis_amo')
           .groupBy('dis_pur_des')
           .orderBy('sum', 'desc')
  }
};