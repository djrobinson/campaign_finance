var knex = require('./knex');

function CommSumm(){
  return knex('committee_summaries');
}

module.exports = {
  getCommSumm: function(){
    return CommSumm().select().limit(10);
  }
};