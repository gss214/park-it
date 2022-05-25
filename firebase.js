import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { initializeFirestore } from "@firebase/firestore"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "",
  authDomain: "park-it-343703.firebaseapp.com",
  projectId: "park-it-343703",
  storageBucket: "park-it-343703.appspot.com",
  messagingSenderId: "780619294323",
  appId: "1:780619294323:web:ba845102e3751b12036c06",
  measurementId: "G-5RCMSY5H3D"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
export const storage = getStorage(app)