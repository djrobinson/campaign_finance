var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var hrSchema = new Schema({
  // "_id": String,
  // "number" : String,
  // "actions" : [],
  // "titles" : [],
  // "sponsor" : {
  //   "name" : String,
  //   "district" : String,
  //   "title" : String,
  //   "state" : String,
  //   "type" : String,
  //   "thomas_id" : String
  // },
  // "related_bills" : [],
  // "status_at" : String,
  // "amendments" : [],
  // "subjects" : [],
  // "introduced_at" : String,
  // "status" : String,
  // "congress" : String,
  // "bill_type" : String,
  // "subjects_top_term" : String,
  // "updated_at" : Date,
  // "by_request" : Boolean,
  // "committees" : [],
  // "popular_title" : String,
  // "short_title" : String,
  // "summary" : String,
  // "official_title" : String,
  // "history" : {
  //   "active" : Boolean,
  //   "vetoed" : Boolean,
  //   "enacted" : Boolean,
  //   "awaiting_signature" : Boolean
  // },
  // "cosponsors" : [ ],
  // "bill_id" : String,
  // "enacted_as" : String
});


// the schema is useless so far
// we need to create a model using it
var Hr = mongoose.model('Hr', hrSchema);

// make this available to our users in our Node applications
module.exports = Hr;