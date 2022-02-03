const form = document.querySelector("#form")
const todo = document.querySelector("#todo")
const inputText = document.querySelector("#inputText");
const btnSubmit = document.querySelector("#btnSubmit");
const btnClear = document.querySelector("#btnClear");
let modal = document.getElementById("myModal");
let btn = document.getElementById("btnEdit");
let span = document.querySelector(".close");
let btnModalSubmit = document.querySelector("#btnModalSubmit")
let inputValue = document.querySelector("#inputValue")
let currentId = '';

let data = [];

const render = (title, id, completed = false) => (
    `<div class='card ${completed ? "completed" : ""}' id=${id}>
    <span id=${'span'+id}>${title}</span>
    <button class = 'btnDelete'>Delete</button>
    <button class = 'btnDone'>Done</button>
    <button id =${'button'+id} class = 'btnEdit'>Edit</button>
    </div>
    `
)

btnSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    data.push({ text: inputText.value, completed: false, id: Date.now() });
    todo.innerHTML = '';

    data.forEach((item, index) => {
        todo.innerHTML += render(item.text, item.id, item.completed)
    })

    form.reset();
});

todo.addEventListener('click', (event) => {
    const card = event.target.closest('.card');
    const cardId = +card.id;
    const span = document.getElementById('span' + cardId)

    switch (true) {
        case event.target.classList.contains('btnDelete'):
            todo.innerHTML = '';
            data.splice(cardId, 1)
            data.forEach((item, index) => {
                todo.innerHTML += render(item.text, index, item.completed)
            })
            break;
        case event.target.classList.contains('btnDone'):
            todo.innerHTML = '';
            const completed = event.target.closest('.completed')
            data.forEach((item, index) => {
                if (index === cardId) {
                    item.completed = completed ? false : true
                }
                todo.innerHTML += render(item.text, index, item.completed)
            })
            break;
        case event.target.classList.contains('btnEdit'):
            modal.style.display = "block";
            inputValue.value = span.innerText;
            inputValue.value.id = span.innerText.id;
            currentId = cardId;
            break;
    }
});

const modalFunction = () => {
    modal.style.display = "none";
}
span.addEventListener('click', modalFunction);

const closeModal = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

window.addEventListener('click', closeModal);


const clearFunction = (event) => {
    event.preventDefault();
    todo.innerHTML = '';
    data = [];
}
btnClear.addEventListener('click', clearFunction);


const editFunction = (event) => {
    event.preventDefault();
    const span = document.getElementById('span' + currentId)
    span.innerText = inputValue.value
    data.forEach((item) => {
        if (item.id == currentId) {
            item.text = inputValue.value
        }
    })
    modal.style.display = "none";
}

btnModalSubmit.addEventListener('click', editFunction);