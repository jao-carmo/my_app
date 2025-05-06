import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBgqx7KLY5Q21S_EUMDDAVsi_K_evDdWDc",
  authDomain: "hamburgueriafol.firebaseapp.com",
  projectId: "hamburgueriafol",
  storageBucket: "hamburgueriafol.firebasestorage.app",
  messagingSenderId: "1045282744430",
  appId: "1:1045282744430:web:5aac05c3c70300f75f9e7f",
  measurementId: "G-REMXVFZFM6"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
// export default app;