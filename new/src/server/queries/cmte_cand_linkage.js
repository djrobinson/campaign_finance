var knex = require('./knex');

function CandLink(){
  return knex('cmte_cand_linkage');
}

module.exports = {
  getTenCandLink: function(){
    return CandLink().select().limit(10);
  },
  getCandLink: function(can_id){
    return CandMstr().select().where({can_id: can_id});
  }
};
