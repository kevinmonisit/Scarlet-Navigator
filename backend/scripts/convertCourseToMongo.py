import pymongo
import json
from pymongo import MongoClient, InsertOne

# TODO: Set local database url to something in dotenv
# pip3 install pymongo[srv] put into the README.md

client = pymongo.MongoClient("mongodb://localhost:27017/s-n-t")
db = client["s-n-t"]
collection = db.courses
collection.delete_many({})
requesting = []

with open(r"jsonminifier.json") as f:
    for jsonObj in f:
        myDict = json.loads(jsonObj)
        courses = myDict['courses']

        def get_campus(obj):
            return obj['description']

        for course in courses:
            campus_locations = list(map(get_campus, course['campusLocations']))
            projection = {
              'title': course['title'],
              'credits': course['credits'],
              'school': course['school']['description'],
              'subject': course['subjectDescription'],
              'courseString': course['courseString'],
              'campusLocations': campus_locations
            }

            # idea: so that we can either search by full title or shorten title
            # query_title = course['expandedTitle'] if course['expandedTitle'] else course['title']
            # when search query, use query_title

            requesting.append(InsertOne(projection))


result = collection.bulk_write(requesting)
client.close()
