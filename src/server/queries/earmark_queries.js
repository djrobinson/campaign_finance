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
  }
};