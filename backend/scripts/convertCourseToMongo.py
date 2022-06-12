from gc import collect
import pymongo
import json
from pymongo import MongoClient, InsertOne
import re

# TODO: Set local database url to something in dotenv
# pip3 install pymongo[srv] put into the README.md

client = pymongo.MongoClient("mongodb+srv://doadmin:36s8M2o4y095uZdX@scarletnav-db-d5385c42.mongo.ondigitalocean.com/s-n-t?tls=true&authSource=admin&replicaSet=scarletnav-db")
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

            query_title = course['expandedTitle'] if course['expandedTitle'] else course['title']
            query_title = " ".join(query_title.split())
            # query_title = query_title.replace("\t", "")
            projection['queryTitle'] = query_title

            requesting.append(InsertOne(projection))

result = collection.bulk_write(requesting)

# Create the user
collection = db.users
collection.delete_many({})
user = {
    'courses': [],
    'startingYear': 2021,
    'plan': [[] for _ in range(8)]
}
collection.insert_one(user)

client.close()
