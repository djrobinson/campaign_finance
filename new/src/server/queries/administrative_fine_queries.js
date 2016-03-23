var knex = require('./knex');

function Admin(){
  return knex('administrative_fines');
}

module.exports = {
  getAdminFines: function(){
    return Admin().select().limit(10);
  }
};