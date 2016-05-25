var knex = require('./knex');


module.exports = {
   getTenReq: function(){
    return knex('member')
            .select()
            .limit(10);
  },
};