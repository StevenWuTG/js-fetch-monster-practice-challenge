// DOM QueryList
const createMonDiv = document.querySelector("div#create-monster")
const monContainerDiv = document.querySelector("div#monster-container")
const backButton = document.querySelector("button#back")
const forwardButton = document.querySelector("button#forward")
let page = 1

// monsters fetch 

function loadMonsters() {
    fetch("http://localhost:3000/monsters/?_limit=50&-page=1")
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            renderMon(element)   
                   
        });
    })
}


function initialize() {
    loadMonsters()
    renderNewMonForm()  
}
initialize()

// render functions

function renderMon(data) {
    const div = document.createElement("div")
    const h2 = document.createElement("h2")
    const p = document.createElement("p")
    div.dataset.id = data.id
    div.classList.add("monster")

    h2.textContent = `Name: ${data.name}  Age: ${data.age}`
    p.textContent = `${data.description}`

    div.append(h2, p)
    monContainerDiv.append(div)
}

function renderNewMonForm() {
    const form = document.createElement("form")
    const nameForm = document.createElement("input")
    nameForm.type = "text"
    nameForm.name = "name"
    nameForm.value = "name"
    const ageForm = document.createElement("input")
    ageForm.type = "text"
    ageForm.name = "age"
    ageForm.value = "age"
    const descForm = document.createElement("input")
    descForm.type = "text"
    descForm.name = "description"
    descForm.value = "description"
    const submitInput = document.createElement("input")
    submitInput.type = "submit"
    submitInput.name = "submit"
    submitInput.value = "Create Monster"
    form.append(nameForm,ageForm,descForm, submitInput)
    createMonDiv.append(form)

}
