import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyAEiYMZRllkydpjz6mKdNdbOp3K2M5_Rn4",
    authDomain: "project-one-2f0c5.firebaseapp.com",
    projectId: "project-one-2f0c5",
    storageBucket: "project-one-2f0c5.appspot.com",
    messagingSenderId: "541329728954",
    appId: "1:541329728954:web:45a0cded6aa5643f47a983",
    measurementId: "G-NCJL34MJVX"
  };

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth};