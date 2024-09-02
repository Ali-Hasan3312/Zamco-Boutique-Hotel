import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDS4HPBwZv_Cw1v364C-op4WdYR1-0PDY4",
    authDomain: "zamco-boutique-hotel.firebaseapp.com",
    projectId: "zamco-boutique-hotel",
    storageBucket: "zamco-boutique-hotel.appspot.com",
    messagingSenderId: "782949732969",
    appId: "1:782949732969:web:cee57515a553163e8808f8"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);