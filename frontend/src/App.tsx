import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { Suspense, useEffect, useState } from 'react';
import 'normalize.css';
import { initializeApp } from 'firebase/app';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { collection, doc, DocumentReference, getDoc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { CircularProgress } from '@mui/material';
import { getAuth } from 'firebase/auth';
import LandingPage from './landingPage';
import NavBar from './components/Navbar';
import { defaultSettings } from './interfaces/Settings';

const Dashboard = React.lazy(() => import('./Dashboard'));

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

function isRutgersDomain(email: string | null) {
  return email && /rutgers.edu\s*$/.test(email);
}

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
// connectFunctionsEmulator(functions, 'localhost', 5001);
// connectFirestoreEmulator(db, 'localhost', 8080);

function CreateBlankPlan() {
  const blankPlan = {};
  for (let i = 0; i < 20; i += 1) {
    blankPlan[i] = [];
  }
  return {
    plan: blankPlan,
    settings: { ...defaultSettings }
  };
}

async function createUser(uid: string, displayName: string | null) {
  const userCollectionRef = collection(db, 'users');
  await setDoc(doc(userCollectionRef, uid), {
    uid,
    createdAt: serverTimestamp(),
    plan: CreateBlankPlan(),
    secondPlan: CreateBlankPlan(),
    thirdPlan: CreateBlankPlan(),
    transferCourses: [],
    displayName
  });
}

function App() {
  const [user] = useAuthState(auth);
  const [userDocRef, setUserDocRef] = useState<DocumentReference | any>(null);
  const [error, setError] = useState<boolean>(false);
  const [userDataExists, setUserDataExists] = useState<boolean>(false);

  useEffect(() => {
    // if user state has not been defined yet, do nothing
    if (!user) return;
    if (!isRutgersDomain(user.email)) {
      setError(true);
      return;
    }

    setError(false);

    /**
     * If user is logged in, check if user data exists in database. If not, create user data.
     * Then, we can set the userDocRef to the user's document reference.
     */
    const docRef = doc(db, 'users', user.uid);
    getDoc(docRef).then(async (userDocTemp) => {
      if (!userDocTemp.exists()) {
        await createUser(user.uid, user.displayName);
      }
      setUserDataExists(true);
    });

    setUserDocRef(docRef);
  }, [user]);

  if (!app || !auth.app) { return <div />; }

  /**
   * If user is not logged in, show the landing page. Once, user is logged in, user's data
   * has loaded, and user's data has been set, show the dashboard.
   */

  return (
    <div className="h-screen w-screen flex flex-col">
      {
        user && userDocRef && userDataExists && isRutgersDomain(user.email)
          ? (
            <>
              <NavBar
                name={user.displayName}
                auth={auth}
              />
              <Suspense fallback={<CircularProgress />}>
                <Dashboard
                  userDocReference={userDocRef}
                  dbReference={db}
                />
              </Suspense>
            </>
          ) : <LandingPage auth={auth} error={error} />
      }
    </div>
  );
}

export default App;
