var knex = require('./knex');

function CommSumm(){
  return knex('committee_summaries');
}

module.exports = {
  getTenCommSumm: function(){
    return CommSumm().select().limit(10);
  },
  getCommSumm: function(can_id){
    return CommSumm().select().where({can_id: can_id});
  }
};