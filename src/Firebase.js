import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6r9r_B_XLw2lXwcCPqBvfJ--zKVxmAx0",
  authDomain: "movies-watchlist-42752.firebaseapp.com",
  projectId: "movies-watchlist-42752",
  storageBucket: "movies-watchlist-42752.appspot.com",
  messagingSenderId: "541839784551",
  appId: "1:541839784551:web:c2decb26e77a501d88f2c2",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
