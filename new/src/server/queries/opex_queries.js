var knex = require('./knex');

function CmteToCand(){
  return knex('opex');
}

module.exports = {
  getTenOpex: function(){
    return CmteToCand().select().limit(10);
  },
  getOpexByCmte: function(cmte_id){
    return CamCmteRpt().select().where({cmte_id: cmte_id});
  }
}
