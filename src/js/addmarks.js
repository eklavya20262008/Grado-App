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
    qp = parseFloat(qp)
    cp = parseFloat(cp)
    ece = parseFloat(ece)
    fee = parseFloat(fee)
    maths = parseFloat(maths)
    console.log(qp)

    if (
        !Number.isFinite(qp) ||
        !Number.isFinite(cp) ||
        !Number.isFinite(fee) ||
        !Number.isFinite(ece) ||
        !Number.isFinite(maths)) {
        message.innerText = "Marks must be a number"
        setTimeout(() => {
            window.location.reload()
        }, 800);
        return
    }
    if ((!qp && qp !== 0)
        || (cp !== 0 && !cp)
        || (ece !== 0 && !ece)
        || (fee !== 0 && !fee)
        || (maths !== 0 && !maths)) {
        message.innerText = "please enter all subjects marks"
        window.location.href = "dashboard.html"
        return
    }
    if (qp > 20 || cp > 20 || ece > 20 || fee > 20 || maths > 20) {
        message.innerText = "Marks should be less then or equal to 20"
        setTimeout(() => [
            window.location.href = "marks.html"
        ], 1000)
        return

    }
    onAuthStateChanged(auth, async (user) => {
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, { "subject": ["Computer Programming", "Quantum Physics", "FEE", "ECE", "Math"], "marksarr": [cp, qp, fee, ece, maths] }, { merge: true })
        const newdata = (await getDoc(userRef)).data()
        message.innerText = "Done !"

        window.location.href = "dashboard.html"

    })
    logEvent(analytics, 'button_click', {
        button_name: 'marks_add_button',
        page_location: window.location.href
    })
})
