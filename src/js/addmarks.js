import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";
import { logEvent, analytics, db, auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js"

const qpInput = document.getElementById("qp")
const cpInput = document.getElementById("cp")
const eceInput = document.getElementById("ece")
const feeInput = document.getElementById("fee")
const mathsInput = document.getElementById("math")
const saveBtn = document.getElementById("saveBtn")
const message = document.getElementById("message")

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html"
        return
    }
})

saveBtn.addEventListener("click", async (e) => {
    e.preventDefault()
    let qp = qpInput.value
    let cp = cpInput.value
    let ece = eceInput.value
    let fee = feeInput.value
    let maths = mathsInput.value
    message.innerText = "Loading..."


    if (
        !Number.isFinite(qp) || 
        !Number.isFinite(cp) || 
        !Number.isFinite(fee) || 
        !Number.isFinite(ece)|| 
        !Number.isFinite(maths)) {
        message.innerText = "Marks must be a number"
        window.location.href = "dashboard.html"
        return
    }
    if (!qp || !cp || !ece || !fee || !maths) {
        message.innerText = "please enter all subjects marks"
        window.location.href = "dashboard.html"
        return
    }
    if (qp > 20 || cp > 20 || ece > 20 || fee > 20 || maths > 20) {
        message.innerText = "Marks should be less then or equal to 20"
        setTimeout(()=>[
            window.location.href = "marks.html"
        ],1000)
        return

    }
    onAuthStateChanged(auth, async (user) => {
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, { "subject": ["Computer Programming", "Quantum Physics", "FEE", "ECE", "Math"], "marksarr": [cp, qp, fee, ece, maths] }, { merge: true })
        const newdata = (await getDoc(userRef)).data()
        message.innerText = "Done !"

        window.location.href = "dashboard.html"

    })
})
