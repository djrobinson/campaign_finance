var knex = require('./knex');

function IndExpen(){
  return knex('independent_expenditures');
}

module.exports = {
  getIndExpen: function(){
    return IndExpen().select().limit(10);
  }
};