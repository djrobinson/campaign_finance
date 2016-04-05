var knex = require('./knex');

function CandMstr(){
  return knex('candidate_master');
}

module.exports = {
  getTenCandMstr: function(){
    return CandMstr().select().limit(10);
  },
  getCandMstr: function(can_id){
    return CandMstr().select().where({can_id: can_id});
  },
  getCandLast: function(last_nm){
    return CandMstr().select().where('CAND_NAME', 'like', '%'+last_nm.toUpperCase()+'%')
  }
};
