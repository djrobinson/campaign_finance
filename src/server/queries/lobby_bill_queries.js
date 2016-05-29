var knex = require('./knex');


module.exports = {
   getTenLobbyBills: function(){
    return knex('lobby_bill')
            .select()
            .limit(10);
  },
  getLobbyByBill: function(bill_id){
    return knex('lobby_bill')
            .innerJoin('lobby_issue', 'lobby_bill.issue_id', 'lobby_issue.id')
            .select()
            .where({'bill_name': bill_id})
            .limit(10);
  }
};