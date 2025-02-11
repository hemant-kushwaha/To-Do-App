let todos = [];

let todoDataList = document.getElementById("todo-dataList");
let saveButton = document.getElementById("save-todos");
let todoInputBar = document.getElementById("to-do-input-bar");
let getPendingTodosbtn = document.getElementById("get-todos");
let getAllTodosBtn = document.getElementById("get-all-todo");

getPendingTodosbtn.addEventListener("click",() =>{
    todos= todos.filter((x) => x.status != "Finished")
    reRenderToDO();
})


todoInputBar.addEventListener("keyup",function(event){
    let todotext = todoInputBar.value.trim();
    if (todotext.length == 0) {
        saveButton.classList.add("disabled");
    } else {
        saveButton.classList.remove("disabled");
    }
    // Save Todo on Enter Key Press
    if (event.key === "Enter") {
        getTextAndAddtodo();
    }
})

function toggleSaveButton() {
    
}




function getTextAndAddtodo (){
    let todotext = todoInputBar.value.trim();
    if(todotext.length == 0) return;

    let todo = {text: todotext,status:"In Progress", finishButtonText:"Finished"};
    todos.push(todo);
    addToDo(todo,todos.length);
    
    todoInputBar.value ='';
    
}

saveButton.addEventListener("click" ,getTextAndAddtodo)

function reRenderToDO () {
    todoDataList.innerHTML = '';
    todos.forEach((element,idx) => {
        addToDo(element,idx+1);
    });
}

function removeToDO (event){
    // event.target.parentElement.parentElement.parentElement.remove();
    let deleteButtonPressed = event.target;
    let indextoBERemoved = Number(deleteButtonPressed.getAttribute("todo-idx"));
    todos.splice(indextoBERemoved,1);
    reRenderToDO();

};


function finishToDo(event) {
    let finishedButtonPressed = event.target;
    let indextoBEFinished = Number(finishedButtonPressed.getAttribute("todo-idx"));

    //toggle Functionality
    if( todos[indextoBEFinished].status == "Finished"){
        todos[indextoBEFinished].status = "In Progress";
        todos[indextoBEFinished].finishButtonText = "Finished";
    }
    else{
        todos[indextoBEFinished].status = "Finished";
        todos[indextoBEFinished].finishButtonText = "undo";
    }

    todos.sort((a,b) => {
        if(a.status == "Finished"){
            return 1;
        }
        return -1;
    })
    reRenderToDO();
    
}

function editTodo (event){
    let editButtonPressed = event.target;
    let indextoBEEdited = Number(editButtonPressed.getAttribute("todo-idx"));

     // Prevent editing if status is "Finished"
     if (todos[indextoBEEdited].status === "Finished") {
        alert("You cannot edit a finished task!");
        return;
    }

    let detailDiv = document.querySelector(`div[todo-idx= "${indextoBEEdited}"]`);
    let input = document.querySelector(`input[todo-idx= "${indextoBEEdited}"]`);
    detailDiv.style.display = "none";
    input.type="text";
    input.value = detailDiv.textContent;
  }

  function saveEditiedTodo(event) {
    let input = event.target;
    let indextoBEEdited = Number(input.getAttribute("todo-idx"));
    let detailDiv = document.querySelector(`div[todo-idx= "${indextoBEEdited}"]`);

    if (event.keyCode == 13) {
        let newText = input.value.trim();
        if (newText.length > 0) {
            todos[indextoBEEdited].text = newText;  // Update the array
            detailDiv.textContent = newText;
        }

        detailDiv.style.display = "block";
        input.value = "";
        input.type = "hidden";
    }
}



function addToDo(todo,todoCount) {

    //Creating all the elments
    let rowDiv = document.createElement("div");
    let toDoItem = document.createElement("div");
    let todoNo = document.createElement("div");
    let todoDetail = document.createElement("div");
    let todoStatus = document.createElement("div");
    let todoActions = document.createElement("div");
    let deleteBtn = document.createElement("button");
    let finishBtn = document.createElement("button");
    let editBtn = document.createElement("button");
    let hiddenInput = document.createElement("input");
    let hr = document.createElement("hr");
    
 
    //Adding classes
     rowDiv.classList.add("row");
     toDoItem.classList.add("list-todos-item","d-flex","flex-row","justify-content-between", "align-items-center");
     todoNo.classList.add("to-do-No");
     todoDetail.classList.add("to-do-details");
     todoStatus.classList.add("to-do-status");
     todoActions.classList.add("to-do-actions","d-flex","justify-content-start","gap-2");
     finishBtn.classList.add("btn","btn-success","finish-todo");
     deleteBtn.classList.add("btn","btn-danger"),"delete-todo";
     editBtn.classList.add("btn","btn-warning","edit-todo");
     hiddenInput.classList.add("form-control","to-do-details");

     //Adding Attributes
     finishBtn.setAttribute("todo-idx",todoCount-1);
     deleteBtn.setAttribute("todo-idx",todoCount-1);
     editBtn.setAttribute("todo-idx",todoCount-1);
     todoDetail.setAttribute("todo-idx",todoCount-1);
     hiddenInput.setAttribute("todo-idx",todoCount-1);
     hiddenInput.type = "hidden";


    //Adding click  listeners
     finishBtn.onclick = finishToDo;
     deleteBtn.onclick = removeToDO;
     editBtn.onclick = editTodo;
     hiddenInput.addEventListener("keypress",saveEditiedTodo);



     
    //adding content to the elements
    todoNo.textContent = `${todoCount}.`;
    todoStatus.textContent = todo.status;
    deleteBtn.textContent = "Delete";
    finishBtn.textContent = todo.finishButtonText;
    editBtn.textContent = "Edit";
    todoDetail.textContent = todo.text; //sets the to do text sent fromthe input element


    //Creating div on dom
    todoActions.appendChild(deleteBtn);
    todoActions.appendChild(finishBtn);
    todoActions.appendChild(editBtn);
    toDoItem.appendChild(todoNo);
    toDoItem.appendChild(todoDetail);
    toDoItem.appendChild(hiddenInput);
    toDoItem.appendChild(todoStatus);
    toDoItem.appendChild(todoActions);

    rowDiv.appendChild(toDoItem);
    rowDiv.appendChild(hr);

    todoDataList.appendChild(rowDiv);
}
 























