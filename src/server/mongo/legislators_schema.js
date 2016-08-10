var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var legislatorsSchema = new Schema({
    "_id": String,
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
      "birthday": String,
      "gender": String,
      "religion": String
    },
    "terms": []
},{
    toObject: {virtuals: true},
    toJSON: {virtuals: true },
    noVirtualId: true
});

// legislatorsSchema.virtual("can_ids").get(function()
// {
//     return this.id;
// });



var Legislators = mongoose.model('Legislators', legislatorsSchema);

module.exports = Legislators;