import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore";

 const app = initializeApp({
  apiKey: "AIzaSyBNztZfuci82BlyCMBqtOZet6_c8cWjuSg",
  authDomain: "hello-clever-programer.firebaseapp.com",
  projectId: "hello-clever-programer",
  storageBucket: "hello-clever-programer.appspot.com",
  messagingSenderId: "721962857821",
  appId: "1:721962857821:web:feeea35f0afc11024ae4b4",
  measurementId: "G-KBQSE368HP"
});

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);



