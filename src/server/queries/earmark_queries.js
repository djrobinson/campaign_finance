var knex = require('./knex');


module.exports = {
   getTenReq: function(){
    return knex('member')
            .select()
            .limit(10);
  },

  getReqByCand: function(cand_id){
    return knex('member')
            .select()
            .where({'crp_id': cand_id});
  },

  getEarmarkByCongress: function(cand_id){
    return knex('earmark')
            .select()
            .innerJoin('member', 'member.earmark_id', 'earmark.id')
            .where({'member.crp_id': cand_id})
  }
};