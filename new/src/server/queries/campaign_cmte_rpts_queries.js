var knex = require('./knex');

function CamCmteRpt(){
  return knex('campaign_cmte_rpts');
}

module.exports = {
  getCandCmteRpts: function(){
    return CamCmteRpt().select().limit(10);
  }
};