var knex = require('./knex');


module.exports = {
   getTenLobbyBills: function(){
    return knex('lobby_bill')
            .select()
            .limit(10);
  },
};