var knex = require('./knex');

function CandDisb(){
  return knex('candidate_disbursements');
}

module.exports = {
  getCandDisb: function(){
    return CandDisb().select().limit(10);
  }
};