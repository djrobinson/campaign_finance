var knex = require('./knex');


module.exports = {
   getCmteSum: function(cmte_id, offset){
    return knex('committee_registrations')
           .innerJoin('committee_summaries', 'COMMITTEE_ID', 'com_id')
           .where({'com_id': cmte_id})
           .limit(100)
           .offset(offset);
  },
  getCmteLimit: function(limit, offset){
    if (!limit) { limit = 100; }
    return knex('committee_registrations')
           .innerJoin('committee_summaries', 'COMMITTEE_ID', 'com_id')
           .limit(limit)
           .offset(offset);
  },
  getCmteSort: function(limit, col, offset){
    if (!limit) { limit = 100; }
    return knex('committee_registrations')
           .innerJoin('committee_summaries', 'COMMITTEE_ID', 'com_id')
           .limit(limit)
           .orderBy(col, 'desc')
           .offset(offset);
  }
};