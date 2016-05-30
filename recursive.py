# Import the os module, for the os.walk function
import os
from pymongo import MongoClient
import json

client = MongoClient()
db = client.testPolis

# Set the directory you want to start from
rootDir = './2013/2013'
for dirName, subdirList, fileList in os.walk(rootDir):
    print('Found directory: %s' % dirName)
    for fname in fileList:
      with open(dirName + "/data.json", 'r') as fin:
        item = fin.read()
        jsonitem = json.loads(item)
        result = db.votes.insert_one(jsonitem)

# rootDir = './2013/2013'
# for dirName, subdirList, fileList in os.walk(rootDir):
#   print(fileList)
#   with open(dirname + "/data.json", 'r') as fin:
#     item = fin.read()
#     print(item)


# with open('/Users/danny/seeds/legislators.json', 'r') as fin:
#         item = fin.read()
#         jsonitem = json.loads(item)
#         result = db.legislators.insert_one(jsonitem)