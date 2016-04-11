var knex = require('./knex');


module.exports = {
   getCmteSum: function(cmte_id){
    return knex('committee_registrations')
           .innerJoin('committee_summaries', 'COMMITTEE_ID', 'com_id')
           .where({'com_id': cmte_id})
           .limit(100);
  },
  getCmteLimit: function(limit){
    if (!limit) { limit = 100; }
    return knex('committee_registrations')
           .innerJoin('committee_summaries', 'COMMITTEE_ID', 'com_id')
           .limit(limit);
  },
  getCmteSort: function(limit, col){
    if (!limit) { limit = 100; }
    return knex('committee_registrations')
           .innerJoin('committee_summaries', 'COMMITTEE_ID', 'com_id')
           .limit(limit)
           .orderBy(col, 'desc');
  }
};