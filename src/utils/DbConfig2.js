// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBI28k0e0YgN6RKl14jvOnbStgXNkWHDB4",
  authDomain: "scp-crud.firebaseapp.com",
  projectId: "scp-crud",
  storageBucket: "scp-crud.appspot.com",
  messagingSenderId: "108280660203",
  appId: "1:108280660203:web:c18aa9e8502bc88cc1feae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)