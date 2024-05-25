// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAS-Z5v0S1FbZzkp51ANoF_Z_q5UvK12cc",
  authDomain: "optifly-7c895.firebaseapp.com",
  projectId: "optifly-7c895",
  storageBucket: "optifly-7c895.appspot.com",
  messagingSenderId: "170328483571",
  appId: "1:170328483571:web:d3db8829020ac32c14b986",
  measurementId: "G-NBMV8GZ5Z6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };