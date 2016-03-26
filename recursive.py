# Import the os module, for the os.walk function
import os
from pymongo import MongoClient
import json

client = MongoClient()
db = client.testPolis

# Set the directory you want to start from
# rootDir = './votes'
# for dirName, subdirList, fileList in os.walk(rootDir):
#     print('Found directory: %s' % dirName)
#     for fname in fileList:
#       with open(dirName + "/" + fname, 'r') as fin:
#         print fin.read()

rootDir = './votes/2014/h1'
for dirName, subdirList, fileList in os.walk(rootDir):
    print('Found directory: %s' % dirName)
    for fname in fileList:
      with open('./votes/2014/h1/'+fname, 'r') as fin:
        item = fin.read()
        jsonitem = json.loads(item)
        result = db.restaurants.insert_one(jsonitem)