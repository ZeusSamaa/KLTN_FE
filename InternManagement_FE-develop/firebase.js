import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAeJWL-EzFI8VIrY5dA5m59q5GCAGSPhxw",
  authDomain: "internship-management-90eca.firebaseapp.com",
  projectId: "internship-management-90eca",
  storageBucket: "internship-management-90eca.appspot.com",
  messagingSenderId: "286647749500",
  appId: "1:286647749500:web:df0a2d31e32af8db32f2f9",
  measurementId: "G-SGRN1WYVFT"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);