import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  // apiKey: "AIzaSyDAGMImj4J9QNiZQnGVsHRaqRqUjsKCMes",

  // authDomain: "reactcrud-ed765.firebaseapp.com",

  // projectId: "reactcrud-ed765",

  // storageBucket: "reactcrud-ed765.appspot.com",

  // messagingSenderId: "65661408881",

  // appId: "1:65661408881:web:f7c8b7d11f37c06a75edd0"

  apiKey: "AIzaSyBLSuwa1LeYRVAgRc4tiLkdnptIWjs_Fv4",

  authDomain: "scpproject-f7793.firebaseapp.com",

  projectId: "scpproject-f7793",

  storageBucket: "scpproject-f7793.appspot.com",

  messagingSenderId: "458422091007",

  appId: "1:458422091007:web:53dbfb2f89c47c72a360ca"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);