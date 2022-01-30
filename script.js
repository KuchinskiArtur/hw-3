const form = document.querySelector("#form")
const todo = document.querySelector("#todo")
const inputText = document.querySelector("#inputText");
const btnSubmit = document.querySelector("#btnSubmit");
const btnClear = document.querySelector("#btnClear");
let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];

let data = [];

btnSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    data.push(inputText.value);
    todo.innerHTML = '';

    data.forEach((title, index) => {
        todo.innerHTML += `
            <div class='card' id=${index}>
            ${title}
            <button id='btnDelete'>Delete</button>
            <button id='btnDone'>Done</button>
            </div>
            `;
    })

    form.reset();
});

todo.addEventListener('click', (event) => {
    if (event.target.id === 'btnDelete') {
        const card = event.target.closest('.card');
        const cardId = +card.id;
        data.splice(cardId, 1)
        todo.innerHTML = '';
        data.forEach((title, index) => {
            todo.innerHTML += `
            <div class='card' id=${index}>
            ${title}
            <button id='btnDelete'>Delete</button>
            <button id='btnDone'>Done</button>
            </div>
            `;

        })
    }
});

todo.addEventListener('click', (event) => {
    if (event.target.id === 'btnDone') {
        const card = event.target.closest('.card');
        const cardId = +card.id;
        const completed = event.target.closest('.completed')
        todo.innerHTML = '';
        data.forEach((title, index) => {
            if (index == cardId && !completed) {
                todo.innerHTML += `
                <div class='card completed' id=${index}>
                ${title}
                <button id='btnDelete'>Delete</button>
                <button id='btnDone'>Done</button>
                </div>
                `;
            } else {
                todo.innerHTML += `
                <div class='card' id=${index}>
                ${title}
                <button id='btnDelete'>Delete</button>
                <button id='btnDone'>Done</button>
                </div>
                `;
            }
        })
    }
});



btn.onclick = function(event) {
    event.preventDefault();
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

btnClear.addEventListener('click', clearFunction);

function clearFunction(event) {
    event.preventDefault();
    todo.innerHTML = '';
    data = [];
}