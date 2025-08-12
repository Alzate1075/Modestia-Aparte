import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import Envs from "../variables/envs";

const firebaseConfig = {
  apiKey: Envs.FIREBASE_API_KEY,
  authDomain: Envs.FIREBASE_AUTH_DOMAIN,
  projectId: Envs.FIREBASE_PROJECT_ID,
  storageBucket: Envs.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Envs.FIREBASE_MESSAGING_SENDER_ID,
  appId: Envs.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
