Mongo queries to aggregate candidate votes:

> db.votes.aggregate([{"$unwind":"$votes.Nay"}, {"$match":{"votes.Yea.id":"Y000033"}}, {"$project":{"question":1}}]);

Find vote by vote id (will be bill_id in bill/amendment tables)

> db.votes.find({"vote_id":"s27-113.2014"});