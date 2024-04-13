import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDkDe75HZm9YXQM8Wh_WDTWxilF7N8q0ls",
  authDomain: "fashionista-a216b.firebaseapp.com",
  projectId: "fashionista-a216b",
  storageBucket: "fashionista-a216b.appspot.com",
  messagingSenderId: "517518039510",
  appId: "1:517518039510:web:e6a284e68588fc7bd42c77",
  measurementId: "G-NRZRWQSXMS",
};

const app = initializeApp(firebaseConfig);

export default firebaseConfig;
export const auth = getAuth(app);
