var knex = require('./knex');

function CamCmteRpt(){
  return knex('campaign_cmte_rpts');
}

module.exports = {
  getTenCandCmteRpts: function(){
    return CamCmteRpt().select().limit(10);
  },
  getCandCmteRpts: function(can_id){
    return CamCmteRpt().select().where({can_id: can_id});
  }
};