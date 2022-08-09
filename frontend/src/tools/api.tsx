async function queryPlan(
  db: 'firestore' | 'mongodb',
  planIndex: 1 | 2 | 3
) {
  return { db, planIndex };
}

export default { queryPlan };
