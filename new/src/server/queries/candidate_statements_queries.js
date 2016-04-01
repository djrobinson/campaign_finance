var knex = require('./knex');

function CandStat(){
  return knex('candidacy_statements');
}

module.exports = {
  getTenCandStat: function(){
    return CandStat().select().limit(10);
  },
  getCandStat: function(can_id){
    return CandStat().select().where({can_id: can_id});
  }
};