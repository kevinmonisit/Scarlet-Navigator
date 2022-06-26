from gc import collect
import pymongo
import json
from pymongo import MongoClient, InsertOne
import re

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
            desc = obj['description']
            if desc.lower() == 'o':
                return 'Online'
            return desc

        def get_core(obj):
            return obj['code']

        for course in courses:
            campus_locations = list(map(get_campus, course['campusLocations']))
            cores = list(map(get_core, course['coreCodes']))
            projection = {
              'title': course['title'],
              'credits': course['credits'],
              'school': course['school']['description'],
              'subject': course['subjectDescription'],
              'courseString': course['courseString'],
              'campusLocations': campus_locations,
              'cores': cores
            }

            query_title = course['expandedTitle'] if course['expandedTitle'] else course['title']
            query_title = " ".join(query_title.split())
            projection['queryTitle'] = query_title

            requesting.append(InsertOne(projection))

result = collection.bulk_write(requesting)

# Create the user
collection = db.users
collection.delete_many({})
user = {
    'courses': [],
    'startingYear': 2021,
    'plan': [[] for _ in range(24)]
}
res = collection.insert_one(user)
print('User ID: ', res.inserted_id)

client.close()
