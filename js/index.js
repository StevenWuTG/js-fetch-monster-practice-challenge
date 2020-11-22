// DOM QueryList
const createMonDiv = document.querySelector("div#create-monster")
const monContainerDiv = document.querySelector("div#monster-container")
const backButton = document.querySelector("button#back")
const forwardButton = document.querySelector("button#forward")
let page = 1


// monsters fetch 

function loadPage(page) {
    fetch(`http://localhost:3000/monsters/?_limit=50&-page=${page}`)
    .then(response => response.json())
    .then(dataArr => {
        dataArr.forEach(monster => {
            renderMon(monster)   
                   
        });
    })
}


function initialize() {
    loadPage(page)
    renderNewMonForm()  
}

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



// Events  
createMonDiv.addEventListener("submit", function(e) {
    e.preventDefault

    const newMon = {
        name: e.target.name.value,
        age: e.target.age.value,
        description: e.target.description.value
    }
    fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(newMon)
    })
    .then(response => response.json())
    .then(newMon => {
        renderMon(newMon)
    })
   
})


backButton.addEventListener("click", function(e) {
    loadPage(page--)
    console.log(page)
})

forwardButton.addEventListener("click", function(e) {
    loadPage(page++)
    console.log(page)
})





initialize()