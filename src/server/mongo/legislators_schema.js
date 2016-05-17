var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var legislatorSchema = new Schema({
    "id": {
      "bioguide": String,
      "thomas": String,
      "lis": String,
      "govtrack": Number,
      "opensecrets": String,
      "votesmart": Number,
      "fec": [],
      "cspan": Number,
      "wikipedia": String,
      "house_history": Number,
      "ballotpedia": String,
      "maplight": Number,
      "washington_post": String,
      "icpsr": Number,
      "wikidata": String
    },
    "name": {
      "first": String,
      "last": String,
      "official_full": String
    },
    "bio": {
      "birthday": Date,
      "gender": String,
      "religion": String
    },
    "terms": []
});

var Legislator = mongoose.model('Legislator', legislatorSchema);

module.exports = Legislator;