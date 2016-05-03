var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sresSchema = new Schema({
  "_id" : String,
  "number" : Number,
  "actions" : [],
  "titles" : [],
  "sponsor" : {
    "name" : String,
    "district" : Number,
    "title" : String,
    "state" : String,
    "type" : String,
    "thomas_id" : String
  },
  "related_bills" : [],
  "status_at" : Date,
  "amendments" : [],
  "subjects" : [],
  "introduced_at" : Date,
  "status" : String,
  "congress" : String,
  "bill_type" : String,
  "subjects_top_term" : String,
  "updated_at" : Date,
  "by_request" : String,
  "committees" : String,
  "popular_title" : String,
  "short_title" : String,
  "summary" : {
    "date" : Date,
    "text" : String,
    "as" : String
  },
  "official_title" : String,
  "history" : {
    "senate_passage_result" : String,
    "vetoed" : Boolean,
    "active_at" : "2013-01-03",
    "senate_passage_result_at" : Date,
    "awaiting_signature" : Boolean,
    "active" : Boolean,
    "enacted" : Boolean
  },
  "cosponsors" : [],
  "bill_id" : String,
  "enacted_as" : String
});

var Sres = mongoose.model('Sres', sresSchema);

module.exports = Sres;