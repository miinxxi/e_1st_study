const titleInput = document.querySelector(".todo-title-input");
const memoInput = document.querySelector(".todo-memo-input");
const inputBtn = document.querySelector(".todo-input-btn");

const todoListBox = document.querySelector(".todo-list");
const todoItemBox = document.querySelector(".todo-item");

const delTodoAllBtn = document.querySelector(".all-delete");

// key 값
const TODOLIST = "todoList";
let todoList = [];
let id = 0;

function saveTodoList() {
  localStorage.setItem(TODOLIST, JSON.stringify(todoList));
}

// todo를 localStorage에 저장
function saveTodo(titleInputVal, memoInputVal) {
  if (titleInputVal.trim() !== "" && memoInputVal.trim() !== "") {
    const todoObj = {
      id: (id += 1),
      title: titleInputVal,
      memo: memoInputVal,
    };
    todoList.push(todoObj);
    saveTodoList();
  }
}

// todo 값을 받아오기
function createTodo() {
  const titleInputVal = titleInput.value;
  const memoInputVal = memoInput.value;

  paintTodo(titleInputVal, memoInputVal);
  saveTodo(titleInputVal, memoInputVal);
}

function loadTodoList() {
  const loadedTodoList = localStorage.getItem(TODOLIST);
  if (loadedTodoList !== null) {
    const parsedTodoList = JSON.parse(loadedTodoList);
    for (let todo of parsedTodoList) {
      const title = todo.title;
      const memo = todo.memo;
      paintTodo(title, memo);
      saveTodo(title, memo);
    }
  }
}

// todo를 웹 상에 나타내어 주기
function paintTodo(titleInputVal, memoInputVal) {
  // 날짜구하기
  let today = new Date();
  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1; // 월
  let date = today.getDate(); // 날짜

  const divEl_item = document.createElement("div"); // todo-item
  const divEl_itemTop = document.createElement("div"); // todo-item-top
  const dateEl = document.createElement("div"); // date
  const btnEl = document.createElement("dutton"); // element-del
  const divEl_title = document.createElement("div"); // title
  const divEl_memo = document.createElement("div"); // memo

  if (titleInputVal === "" && memoInputVal === "") {
    alert("TODO를 입력하세요.");
  } else if (titleInputVal === "") {
    alert("할 일을 입력하세요.");
  } else if (memoInputVal === "") {
    alert("메모를 남겨주세요");
  } else {
    // item box
    divEl_item.classList.add("todo-item");
    todoListBox.appendChild(divEl_item);
    divEl_item.id = todoList.length + 1;

    // item bot top
    divEl_itemTop.classList.add("todo-item-top");
    divEl_item.appendChild(divEl_itemTop);

    // date
    dateEl.classList.add("todo-create-date");
    dateEl.innerText = `${year}-${month}-${date}`;
    divEl_itemTop.appendChild(dateEl);

    // trash btn
    btnEl.classList.add("element-delete");
    btnEl.textContent = "🗑️";
    divEl_itemTop.appendChild(btnEl);
    btnEl.addEventListener("click", () => {
      if (confirm("정말 삭제하시겠습니까?")) {
        todoListBox.removeChild(divEl_item);
        // console.log(todoListBox);
        // console.log(divEl_item);
        // console.log(divEl_item.id);
        // console.log(todoList);

        todoList = todoList.filter((todo) => todo.id !== Number(divEl_item.id));
        saveTodoList();
      }
    });

    // title
    divEl_title.classList.add("todo-title");
    divEl_title.innerText = titleInputVal;
    divEl_item.appendChild(divEl_title);

    // memo
    divEl_memo.classList.add("todo-memo");
    divEl_memo.innerText = memoInputVal;
    divEl_item.appendChild(divEl_memo);

    // 전체 todo 삭제
    delTodoAllBtn.addEventListener("click", () => {
      const allTodoItem = document.querySelectorAll(".todo-item");
      // console.log(allTodoItem);
      allTodoItem.forEach((item) => {
        item.remove();
      });
      // todoList 배열을 비움
      todoList = [];

      // 비워진 todoList를 저장
      saveTodoList();
    });

    titleInput.value = "";
    memoInput.value = "";
  }
}

// inputBtn.addEventListener("click", createTodo)을 함수로 바꿈
function init() {
  loadTodoList(); // local Storage에 todo가 존재하는지 확인
  inputBtn.addEventListener("click", createTodo);
}
init(); // 호출까지 해줘야 함_따로 부르는 곳이 없으니까
