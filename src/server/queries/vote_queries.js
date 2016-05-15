var knex = require('./knex');

function (){
  return knex('committee_master');
}

module.exports = {
  get: function(){
    return ().select().limit(10);
  },
  get: function(com_id){
    return ().select().where({});
  }
};