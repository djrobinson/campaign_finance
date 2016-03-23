var knex = require('./knex');

function CandSumm(){
  return knex('candidate_summaries');
}

module.exports = {
  getCandSumm: function(){
    return CandSumm().select().limit(10);
  }
};