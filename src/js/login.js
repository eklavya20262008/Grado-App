import { auth, analytics, logEvent } from "./firebase.js"
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js"


const emailInput = document.getElementById("email")
const passwordInput = document.getElementById("password")
const loginBtn = document.getElementById("loginBtn")
const registerBtn = document.getElementById("registerBtn")
const message = document.getElementById("message")

loginBtn.addEventListener("click", async (e) => {
    e.preventDefault()
    const email = emailInput.value
    const password = passwordInput.value
    message.style.color = "white";



    if (!email || !password) {

        message.style.color = "red"
        message.textContent = "Please fill all fields.";
        return;
    }

    try {
        message.textContent = "Loading...";
        const userCredential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

        const user = userCredential.user;

        console.log("Logged in user:", user.uid);
        message.style.color = "green"
        message.textContent = "Login successful ! ";
        console.log("subjects:", user.marksarr);


        logEvent(analytics, 'button_click', {
            old_user: "+1",
            button_name: 'login_button',
            page_location: window.location.href
        })
        // Temporary test
        window.location.href = "dashboard.html"

    } catch (error) {

        console.error(error);
        message.style.color = "red";
        message.textContent = "something went wrong";

    }

})
registerBtn.addEventListener("click", (e) => {
    e.preventDefault()

    window.location.href = "index.html"
})

