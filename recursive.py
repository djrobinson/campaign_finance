# Import the os module, for the os.walk function
import os
from pymongo import MongoClient
import json
import bson

##Using Mongo URI for mongolab seeding:
MONGODB_URI = 'mongodb://<user>:<pw>!@ds023452.mlab.com:23452/heroku_2f1pj73r'

client = MongoClient(MONGODB_URI)

db = client.get_default_database()

# db = MongoClient()
# client = db.testPolis

# Set the directory you want to start from
# rootDir = './2013/2013'
# for dirName, subdirList, fileList in os.walk(rootDir):
#     print('Found directory: %s' % dirName)
#     for fname in fileList:
#       with open(dirName + "/data.json", 'r') as fin:
#         item = fin.read()
#         jsonitem = json.loads(item)
#         result = db.votes.insert_one(jsonitem)

# rootDir = './2013/2013'
# for dirName, subdirList, fileList in os.walk(rootDir):
#   print(fileList)
#   with open(dirname + "/data.json", 'r') as fin:
#     item = fin.read()
#     print(item)

#Seeder for legislators only
with open('/Users/danny/seeds/legislators.json', 'r') as fin:
        item = fin.read()
        jsonitem = json.loads(item)
        print(jsonitem)
        result = db.legislators.insert(jsonitem)

