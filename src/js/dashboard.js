import { auth, db, analytics, logEvent } from "./firebase.js"
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js"
import { doc, getDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js"
const greetMessage = document.getElementById("greetmessage")
const logoutBtn = document.getElementById("logoutBtn")
const addSubBtn = document.getElementById("addSubBtn")
const midsemcontainer = document.querySelector("#midsemcontainer")
const overallload = document.querySelector("#overallload")
const loadcontainerin = document.querySelector("#loadcontainerin")
const percentage = document.querySelector("#percentage")

let u, userRef = ""
const box = document.createElement("div")
box.setAttribute("class", "bg-[#1A1A1E]  shadow-[0_0_6px_1px_rgba(55,55,255,0.1)] my-3 w-full  rounded-md border-[1px] border-solid border-[#2A2A32]")
box.innerHTML = `<h3 class="text-zinc-700 px-2">Loading...</h3>`
midsemcontainer.appendChild(box)
onAuthStateChanged(auth, async (user) => {
    u = user
    if (!user) {

        window.location.href = "login.html";
        return;
    }
    // User is logged in
    console.log("Logged in ! ");




    try {


        userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {

            const userData = userSnap.data();

            // firebase database

            greetMessage.textContent = `${userData.name}!`;



        } else {

            greetMessage.textContent = "Welcome !";
        }
        onSnapshot(userRef, async (snapshot) => {

            if (!snapshot.exists()) {
                console.log("user nahi mila ")
                return
            }
            const data = snapshot.data()
            //snapshot change
            greetMessage.textContent = `${data.name}!`;
            const d = data
            const subjects = d["subject"]
            const marks = d["marksarr"]
            let i = 0
            let sum = 0
            midsemcontainer.replaceChildren()
            if (subjects) {

                subjects.forEach(sub => {
                    const box = document.createElement("div")
                    box.setAttribute("class", "bg-[#1A1A1E] hover:bg-[hsl(240,5%,20%)] hover:scale-101 shadow-[0_0_6px_1px_rgba(55,55,255,0.1)] my-3 w-full  rounded-md border-[1px] border-solid border-[#2A2A32]")
                    box.innerHTML = `<h3 class="px-2">${sub}</h3>
                                <div class=" py-1 px-1 w-full">
                                    <div id="numbers" class="px-2 text-right">${(marks[i])}/20</div>
                                    <div class="bg-[hsl(${(Math.floor(marks[i]) / 20) * 120},100%,80%)]  border-[hsl(${(Math.floor(marks[i]) / 20) * 120},100%,20%)] shadow-[0_0_9px_10px_hsl(${(Math.floor(marks[i]) / 20) * 120},100%,20%,0.2)]  border-solid border-[3px] text-right rounded-lg">
                                        <div class="bg-[hsl(${(Math.floor(marks[i]) / 20) * 120},100%,50%)] w-${Math.floor(marks[i])}/20 p-1 rounded-sm"></div>
                                    </div>
                                </div>`
                    midsemcontainer.appendChild(box)
                    sum += parseFloat(marks[i])
                    i++
                });
                console.log()
                overallload.classList.add(`w-${Math.floor(sum)}/100`)
                overallload.classList.add(`bg-[hsl(${Math.floor(120 + (sum * 180 / 100))},100%,70%)]`)
                loadcontainerin.classList.add(`shadow-[0_0_10px_4px_hsl(${Math.floor(120 + (sum * 180 / 100))},100%,80%,0.2)]`)
                loadcontainerin.classList.add(`bg-[hsl(${Math.floor(120 + (sum * 180 / 100))},100%,20%)]`)
                percentage.innerText = `${sum}` + "%" || 0
            } else {
                const box = document.createElement("div")
                box.setAttribute("class", "bg-[#1A1A1E]  shadow-[0_0_6px_1px_rgba(55,55,255,0.1)] my-3 w-full  rounded-md border-[1px] border-solid border-[#2A2A32]")
                box.innerHTML = `<h3 class="text-zinc-700 px-2">Please add subjects</h3>`
                midsemcontainer.appendChild(box)


            }



        }, (error) => {
            console.error("Firestore listener error:", error);
        })

    } catch (error) {

        console.error("Firestore error:", error);
        greetMessage.textContent = "User";
    }
    logoutBtn.addEventListener("click", async () => {
        await signOut(auth);
        logEvent(analytics, 'button_click', {
            button_name: 'logout_button',
            page_location: window.location.href
        })
        window.location.href = "login.html"
    })
})
addSubBtn.addEventListener("click", async () => {
    console.log(1)
    await logEvent(analytics, 'button_click', {
        button_name: 'marks_change_button',
        page_location: window.location.href
    })
    window.location.href = "marks.html"
})


