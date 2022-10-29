// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOVEeR05d-rQk_eHaMh1dNEY55d0PQ_6w",
  authDomain: "easylogin-621c1.firebaseapp.com",
  projectId: "easylogin-621c1",
  storageBucket: "easylogin-621c1.appspot.com",
  messagingSenderId: "475327646291",
  appId: "1:475327646291:web:d7af15b4dc4920194f54a6",
  measurementId: "G-M6SE3286NR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;