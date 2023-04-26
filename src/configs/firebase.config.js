import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQ7eTbU_M2EvPkDvOI3KbqAEpxxSdAPFw",
  authDomain: "the-dragon-news-5c015.firebaseapp.com",
  projectId: "the-dragon-news-5c015",
  storageBucket: "the-dragon-news-5c015.appspot.com",
  messagingSenderId: "727148501501",
  appId: "1:727148501501:web:4c6e74c3abc0232992a194"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);

export default app;
