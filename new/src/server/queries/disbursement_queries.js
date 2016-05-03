var knex = require('./knex');

module.exports = {
  getDistOrder: function(offset){
    return knex('candidate_disbursements')
          .orderBy('dis_amo', 'desc')
          .limit(100)
          .offset(offset);
  },
  getDisbByCand: function(cand_id, offset){
    return knex('candidate_disbursements')
          .where({'can_id': cand_id})
          .orderBy('dis_amo', 'desc')
          .limit(100)
          .offset(offset);
  },
  getByRec: function(rec_nam, offset){
    return knex('candidate_disbursements')
           .where({'rec_nam': rec_nam})
           .orderBy('dis_amo', 'desc')
           .limit(100)
           .offset(offset);
  },
  getByCode: function(cat_cod, offset){
    return knex('candidate_disbursements')
           .where({'cat_cod': cat_cod})
           .orderBy('dis_amo', 'desc')
           .limit(100)
           .offset(offset);
  },
  aggByType: function(cand_id, offset){
    return knex('candidate_disbursements')
           .select('cat_des')
           .where({'can_id': cand_id})
           .sum('dis_amo')
           .groupBy('cat_des')
           .orderBy('sum', 'desc')
           .limit(100)
           .offset(offset);
  },
  aggByPurp: function(cand_id, offset){
    return knex('candidate_disbursements')
           .select('dis_pur_des')
           .where({'can_id': cand_id})
           .sum('dis_amo')
           .groupBy('dis_pur_des')
           .orderBy('sum', 'desc')
           .limit(100)
           .offset(offset);
  },
  typeTotals: function(offset){
    return knex('candidate_disbursements')
           .select('cat_des')
           .sum('dis_amo')
           .groupBy('cat_des')
           .orderBy('sum', 'desc')
           .limit(100)
           .offset(offset);
  },
  purpTotals: function(offset){
        return knex('candidate_disbursements')
           .select('dis_pur_des')
           .sum('dis_amo')
           .groupBy('dis_pur_des')
           .orderBy('sum', 'desc')
           .limit(100)
           .offset(offset);
  }
};