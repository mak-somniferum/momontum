const todoForm = document.querySelector(".todo-form");
const todoInput = todoForm.querySelector("input");
const listBox = document.querySelector(".list-wrap");
const pendingList = document.querySelector(".todo-list");
const finishedList = document.querySelector(".finished-list");

let pendings = [];
let finished = [];

const PENDING_LS = "PENDING";
const FINISHED_LS = "FINISHED";

// Pending
function savePending() {
    localStorage.setItem(PENDING_LS, JSON.stringify(pendings));
}

function deletePending(event) {
    const li = event.target.parentNode.parentNode;
    li.remove();
    pendings = pendings.filter((item) => item.id !== parseInt(li.id));
    savePending();
}

function paintPending(obj) {
    listBox.classList.add("show");
    const li = document.createElement("li");
    const span = document.createElement("span");
    const btnBox = document.createElement("div");
    const delBtn = document.createElement("button");
    const chkBtn = document.createElement("button");

    li.id = obj.id;
    span.innerText = obj.text;
    btnBox.appendChild(delBtn);
    btnBox.appendChild(chkBtn);
    delBtn.innerText = "Delete";
    chkBtn.innerText = "Finished";

    delBtn.addEventListener("click", deletePending);
    chkBtn.addEventListener("click", submitFinished);

    li.appendChild(span);
    li.appendChild(btnBox);
    pendingList.appendChild(li);
}

function submitPending(event) {
    event.preventDefault();

    const pendingObj = { text: todoInput.value, id: Date.now() };
    pendings.push(pendingObj);
    todoInput.value = "";
    paintPending(pendingObj);
    savePending();
}

// Finished
function backToPending(event) {
    deleteFinished(event);
    const li = event.target.parentNode.parentNode;
    const text = li.querySelector("span").innerText;

    const pendingObj = { text: text, id: parseInt(li.id) };
    pendings.push(pendingObj);
    paintPending(pendingObj);
    savePending();
}

function saveFinished() {
    localStorage.setItem(FINISHED_LS, JSON.stringify(finished));
}

function deleteFinished(event) {
    const li = event.target.parentNode.parentNode;
    li.remove();
    finished = finished.filter((item) => item.id !== parseInt(li.id));
    saveFinished();
}

function paintFinished(obj) {
    listBox.classList.add("show");
    const li = document.createElement("li");
    const span = document.createElement("span");
    const btnBox = document.createElement("div");
    const delBtn = document.createElement("button");
    const bckBtn = document.createElement("button");

    li.id = obj.id;
    span.innerText = obj.text;
    btnBox.appendChild(delBtn);
    btnBox.appendChild(bckBtn);
    delBtn.innerText = "Delete";
    bckBtn.innerText = "Back";

    delBtn.addEventListener("click", deleteFinished);
    bckBtn.addEventListener("click", backToPending);

    li.appendChild(span);
    li.appendChild(btnBox);
    finishedList.appendChild(li);
}

function submitFinished(event) {
    deletePending(event);
    const li = event.target.parentNode.parentNode;
    const text = li.querySelector("span").innerText;

    const finishedObj = { text: text, id: parseInt(li.id) };

    finished.push(finishedObj);
    paintFinished(finishedObj);
    saveFinished();
}

// Load
const savedPending = localStorage.getItem(PENDING_LS);
const savedFinished = localStorage.getItem(FINISHED_LS);

if (savedPending) {
    const parsedPending = JSON.parse(savedPending);
    pendings = parsedPending;
    parsedPending.forEach(paintPending);
}
if (savedFinished) {
    const parsedFinished = JSON.parse(savedFinished);
    finished = parsedFinished;
    parsedFinished.forEach(paintFinished);
}

todoForm.addEventListener("submit", submitPending);
