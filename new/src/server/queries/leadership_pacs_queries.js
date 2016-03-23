var knex = require('./knex');

function LeadPacs(){
  return knex('leadership_pacs');
}

module.exports = {
  getLeadPacs: function(){
    return LeadPacs().select().limit(10);
  }
};