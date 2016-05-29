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
            .innerJoin('lobbying', 'lobbying.transaction_id', 'lobby_issue.transaction_id')
            .select()
            .where({'bill_id': bill_id})
            .orderBy('lobbying.amount', 'desc')
            .limit(100);
  },
  getLobbyByTrans: function(transaction_id){
    return knex('lobby_bill')
            .innerJoin('lobby_issue', 'lobby_bill.issue_id', 'lobby_issue.id')
            .innerJoin('lobbying', 'lobbying.transaction_id', 'lobby_issue.transaction_id')
            .where({'lobbying.transaction_id': transaction_id});
  }
};