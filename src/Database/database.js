import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  
  apiKey:  process.env.REACT_APP_API_KEY,
  authDomain: "nunchitch.firebaseapp.com",
  projectId: "nunchitch",
  storageBucket: "nunchitch.appspot.com",
  messagingSenderId:process.env.REACT_APP_messagingSenderId ,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: "G-VLH8ZBKNQ6"
};

// Initialize Firebase  
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)