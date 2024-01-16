
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
export const firebaseConfig = {
  apiKey: "AIzaSyAo_SEFJVRvtG4zUUqxdmaMha8gMPCkoVk",
  authDomain: "shop-template-f16f6.firebaseapp.com",
  projectId: "shop-template-f16f6",
  storageBucket: "shop-template-f16f6.appspot.com",
  messagingSenderId: "653512966846",
  appId: "1:653512966846:web:96d9844c2d445be63b14ef"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const storage=getStorage(app);
export const db=getFirestore(app);
export default app;