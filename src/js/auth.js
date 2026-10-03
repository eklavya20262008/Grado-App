import { logEvent, analytics, auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js"
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const rollno = document.getElementById("rollno");
const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
const message = document.getElementById("message");

registerBtn.addEventListener("click", async (e) => {
    e.preventDefault()
    console.log("clicked", e)

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const roll = rollno.value;



    if (!name || !email || !password) {
        message.textContent = "Please fill all fields.";
        return;
    }
    if (password.length < 6) {
        message.textContent = "Password must be at least 6 characters."; return;
    } try {
        message.textContent = "Loading...";

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), { createdAt: serverTimestamp(), name: name, email: email, uid: user.uid, password: password, "roll no": roll });
        message.textContent = "Registration successful! Please Login";
        console.log("User created:", user.uid);
    }
    catch (error) {
        console.error(error); message.textContent = error.message;
    }


    logEvent(analytics, 'button_click', {
        user: "+1",
        button_name: 'signup_button',
        page_location: window.location.href
    })


});
loginBtn.addEventListener("click", (e) => {
    e.preventDefault()
    window.location = "login.html"
})



