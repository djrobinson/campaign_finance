var knex = require('./knex');


module.exports = {
   getTenLobbyBills: function(){
    return knex('lobby_bill')
            .select()
            .limit(10);
  },
  getLobbyByBill: function(bill_id){
    return knex('lobby_bill')
            .select()
            .where({'bill_name': bill_id});
  }
};