import { initializeApp, getApps, getApp } from  "firebase/app";
import { getFirestore } from  "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyCpel4KEA4Ljg9KK978W4ghG2iBlIjDyiI",
   authDomain: "notion-clone-mafi.firebaseapp.com",
   projectId: "notion-clone-mafi",
   storageBucket: "notion-clone-mafi.firebasestorage.app",
   messagingSenderId: "611584807703",
   appId: "1:611584807703:web:e23ca560b33dd340d3dd52"
 };

 const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
 const db = getFirestore(app);

   export { db };