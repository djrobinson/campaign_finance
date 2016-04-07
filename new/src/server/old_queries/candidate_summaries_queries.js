var knex = require('./knex');

function CandSumm(){
  return knex('candidate_summaries');
}

module.exports = {
  getTenCandSumm: function(){
    return CandSumm().select().limit(10);
  },
  getCandSumm: function(can_id){
    return CandSumm().select().where({can_id: can_id});
  }
};