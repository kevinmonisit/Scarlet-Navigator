import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';
import algoliasearch from 'algoliasearch/lite';

const MAX_QUERY_COUNT = 23;

// Set up Firestore.
admin.initializeApp();
const db = admin.firestore();
const algoliaClient = algoliasearch(process.env.APP_ID as string, process.env.API_KEY as string);
const index = algoliaClient.initIndex('prod_COURSES');

export const search = functions.runWith({
  maxInstances: 15,
  timeoutSeconds: 60,
}).https.onCall(async (request: Request & {
  query: string,
  amountToQuery: number,
}, response) => {

  if(!request) {
    throw new functions.https.HttpsError('failed-precondition', 'Request is invalid.');
  }

  if(request.query === null || request.query === undefined) {
    throw new functions.https.HttpsError('failed-precondition', 'There exists no valid query.');
  }

  if(!request.amountToQuery || request.amountToQuery < 0 || request.amountToQuery > MAX_QUERY_COUNT) {
    throw new functions.https.HttpsError('invalid-argument', 'Amount to query must be an integer between 0 and 20.');
  }

  if(!response.auth || !response.auth.uid) {
    throw new functions.https.HttpsError('failed-precondition', 'The function was called with invalid authentication');
  }

  const {amountToQuery, query} = request;
  const promises: any[] = [];
  let queriedCourses: any[] = [];

  await index.search(query, {
    hitsPerPage: amountToQuery,
  }).then(async ({hits}) => {
    for(let i = 0; i < hits.length; i += 1) {

      const objectID = hits[i].objectID;
      const courseDoc = db.collection('courses').doc(objectID).get().then((courseDoc) => {
        return courseDoc.data();
      });

      promises.push(courseDoc);
    }

  await Promise.all(promises).then((finishedQuery) => {
    queriedCourses = [...finishedQuery];
  });

  }).catch((error) => {
    //doesn't do anything
    return {error};
  });

  return queriedCourses;
});
