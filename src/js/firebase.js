import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";
import { getAnalytics,logEvent } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-analytics.js";



const firebaseConfig = {
    apiKey: "AIzaSyDBXQZGnwrtHK3RBztRwwrOFq5H5AZfABY",
    authDomain: "fir-project1-cc6c1.firebaseapp.com",
    projectId: "fir-project1-cc6c1",
    storageBucket: "fir-project1-cc6c1.firebasestorage.app",
    messagingSenderId: "421795941320",
    appId: "1:421795941320:web:90634209fe01e9c35fcefd",
    measurementId: "G-2C8MXDHK3B"
};

// 2. Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);
console.log("Connected to Firebase")


export { logEvent,analytics,auth, db } 