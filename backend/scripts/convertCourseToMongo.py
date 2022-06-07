import pymongo
import json
from pymongo import MongoClient, InsertOne

# TODO: Set local database url to something in dotenv
# pip3 install pymongo[srv] put into the README.md

client = pymongo.MongoClient("mongodb://localhost:27017/s-n-t")
db = client["s-n-t"]
collection = db.courseTest
collection.delete_many({})
requesting = []

# with open(r"raw_course_data.json") as f:
with open(r"jsonminifier.json") as f:
    print(f)
    for jsonObj in f:
        myDict = json.loads(jsonObj)
        courses = myDict['courses']

        for course in courses:
            requesting.append(InsertOne(course))


result = collection.bulk_write(requesting)
client.close()
