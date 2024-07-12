// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDIT9PpAuQuTcVcjpHzRj_9WuKgTyl_e_g",
  authDomain: "lactobloom-c7dd4.firebaseapp.com",
  projectId: "lactobloom-c7dd4",
  storageBucket: "lactobloom-c7dd4.appspot.com",
  messagingSenderId: "206090453796",
  appId: "1:206090453796:web:8729b28e0495064dfa69b1",
  measurementId: "G-NQZ0069THN"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
