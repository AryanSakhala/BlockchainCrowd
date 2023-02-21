// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDHr8rk6lry9a-ur-wu5KmCc8Wv_0ELvzY",
    authDomain: "crowdfund-b48e2.firebaseapp.com",
    projectId: "crowdfund-b48e2",
    storageBucket: "crowdfund-b48e2.appspot.com",
    messagingSenderId: "244934705834",
    appId: "1:244934705834:web:2709306ddff268a21d86d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);