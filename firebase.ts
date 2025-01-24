import { initializeApp, getApps, getApp } from  "firebase/app";
import { getFirestore } from  "firebase/firestore";

const firebaseConfig = {
 };

 const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
 const db = getFirestore(app);

   export { db };
