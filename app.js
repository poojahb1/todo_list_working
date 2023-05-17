//define UI vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//load all event listeners
loadEventListeners();

function loadEventListeners(){
    //DOM load event
    document.addEventListener("DOMContentLoaded", getTasks);
    //add task event
    form.addEventListener("submit", addTask)
    // remove task event
    taskList.addEventListener("click", removeTask);
    //clear tasks event
    clearBtn.addEventListener("click", clearTasks);
    //filter tasks event
    filter.addEventListener("keyup", filterTasks);
}

//get Tasks from local storage
function getTasks(){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task){
        //create li element
        const li = document.createElement("li");
        //add class to li element
        li.className="collection-item";
        //create text node and append to li
        li.appendChild(document.createTextNode(task));
        //create new link element
        const link = document.createElement('a');
        //add class to link element
        link.className = "delete-item secondary-content";
        link.innerHTML = '<p class="fa">DELETE</p>';
        // link.innerHTML = `<p>delete</p>`;
        //append link to li
        li.appendChild(link);
        li.appendChild(link);
        //append li to ul
        taskList.appendChild(li);
    })
}

//add Task
function addTask(e){
    if(taskInput.value === ''){
        alert("Add a Task");
    }
    //create li element
    const li = document.createElement("li");
    //add class to li element
    li.className="collection-item";
    //create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link element
    const link = document.createElement('a');
    //add class to link element
    link.className = "delete-item secondary-content";
    link.innerHTML = '<p class="fa">DELETE</p>';
    // link.innerHTML = `<p>delete</p>`;
    //append link to li
    li.appendChild(link);
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);
    //store in local storage
    storeTaskInLocalStorage(taskInput.value);
    //clear input
    taskInput.value = "";
    e.preventDefault();
}

//store task in local storage
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains("delete-item")){
        if(confirm("are you sure?")){
            e.target.parentElement.parentElement.remove();
            //remove from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
    e.preventDefault();
}

//remove task from local storage
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    })
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//clear Tasks
function clearTasks(e){
    if(confirm("are you sure?")){
        // taskList.innerHTML = "";
        //faster way
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
    }
    //clear tasks from local storage
    clearTasksFromLocalStorage;
    e.preventDefault();
}

function clearTasksFromLocalStorage(){
    localStorage.clear();
}

//filter tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll(".collection-item").forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = "block";
        }else{
            task.style.display = "none";
        }
    });
    e.preventDefault();
}

