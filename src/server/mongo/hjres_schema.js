var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var hjresSchema = new Schema({
  "_id" : String,
  "number" : String,
  "actions" : [
    {
      "status" : String,
      String : [
        String
      ],
      "text" : String,
      "references" : [ ],
      "acted_at" : Date,
      "type" : String
    }
  ],
  "titles" : [],
  "sponsor" : {
    "name" : String,
    "district" : Boolean,
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
  "by_request" : Boolean,
  "committees" : [],
  "popular_title" : Boolean,
  "short_title" : Boolean,
  "summary" : {
    "date" : Date,
    "text" : String,
    "as" : String
  },
  "official_title" : String,
  "history" : {
    "active" : Boolean,
    "vetoed" : Boolean,
    "enacted" : Boolean,
    "awaiting_signature" : Boolean
  },
  "cosponsors" : [],
  "bill_id" : String,
  "enacted_as" : String
});


// the schema is useless so far
// we need to create a model using it
var Hjres = mongoose.model('Hjres', hjresSchema);

// make this available to our users in our Node applications
module.exports = Hjres;