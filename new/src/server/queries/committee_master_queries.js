var knex = require('./knex');

function CmteMstr(){
  return knex('committee_master');
}

module.exports = {
  getTenCmteMster: function(){
    return CmteMstr().select().limit(10);
  },
  getCmteMster: function(com_id){
    return CmteMstr().select().where({cmte_id: com_id});
  }
};