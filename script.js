const form = document.querySelector("#form")
const todo = document.querySelector("#todo")
const inputText = document.querySelector("#inputText");
const btnSubmit = document.querySelector("#btnSubmit");
const btnClear = document.querySelector("#btnClear");
let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];

let data = [];

const render = (title, index, completed = false) => (
    `<div class='card ${completed ? "completed" : ""}' id=${index}>
    ${title}
    <button id='btnDelete'>Delete</button>
    <button id='btnDone'>Done</button>
    </div>
    `
)

btnSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    data.push({ text: inputText.value, completed: false });
    todo.innerHTML = '';

    data.forEach((item, index) => {
        todo.innerHTML += render(item.text, index, item.completed)
    })

    form.reset();
});

todo.addEventListener('click', (event) => {
    const card = event.target.closest('.card');
    const cardId = +card.id;

    switch (event.target.id) {
        case 'btnDelete':
            todo.innerHTML = '';
            data.splice(cardId, 1)
            data.forEach((item, index) => {
                todo.innerHTML += render(item.text, index, item.completed)
            })
            break;
        case 'btnDone':
            todo.innerHTML = '';
            const completed = event.target.closest('.completed')
            data.forEach((item, index) => {
                if (index === cardId) {
                    item.completed = completed ? false : true
                }
                todo.innerHTML += render(item.text, index, item.completed)
            })
            break;
    }
});

const modalFunction = (event) => {
    event.preventDefault();
    modal.style.display = "block";
}

btn.addEventListener('click', modalFunction);

const modalFunctions = () => {
    modal.style.display = "none";
}

span.addEventListener('click', modalFunctions);

const modalsFunction = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
window.addEventListener('click', modalsFunction);

const clearFunction = (event) => {
    event.preventDefault();
    todo.innerHTML = '';
    data = [];
}

btnClear.addEventListener('click', clearFunction);