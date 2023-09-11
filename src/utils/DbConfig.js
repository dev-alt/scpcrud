import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

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