// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var voteSchema = new Schema({
  bill: {
    congress: Number,
    number: Number,
    type: String,
  },
  category: String,
  chamber: String,
  congress: Number,
  data: String,
  number: Number,
  question: String,
  requires: String,
  result: String,
  result_text: String,
  session: String,
  source_url: String,
  subject: String,
  type: String,
  updated_at: Date,
  vote_id: String,
  votes: {
    Nay: [],
    'Not Voting': [],
    Present: [],
    Yea: []
  }
});


// the schema is useless so far
// we need to create a model using it
var Vote = mongoose.model('Vote', voteSchema);

// make this available to our users in our Node applications
module.exports = Vote;