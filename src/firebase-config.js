// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

const firebaseConfig = {
    apiKey: "AIzaSyBcO-Y0Ct5wk69sfvtpo8kylwqmL_YWQo4",
    authDomain: "fmfc-1c49e.firebaseapp.com",
    projectId: "fmfc-1c49e",
    storageBucket: "fmfc-1c49e.firebasestorage.app",
    messagingSenderId: "908700279833",
    appId: "1:908700279833:web:4bca5c54ea2d04795eb688"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app)
  const auth = getAuth(app)

  export {db, auth}