const titleInput = document.querySelector(".todo-title-input");
const memoInput = document.querySelector(".todo-memo-input");
const inputBtn = document.querySelector(".todo-input-btn");

const todoListBox = document.querySelector(".todo-list");
const todoItemBox = document.querySelector(".todo-item");

const todoCount = document.querySelector(".todoCount");

// key 값
const TODOLIST = "todoList";
let todoList = [];
let id = 0;

// todo 값을 받아오기
function createTodo() {
  const titleInputVal = titleInput.value;
  const memoInputVal = memoInput.value;
  const completedVal = false;

  paintTodo(titleInputVal, memoInputVal, completedVal);
  saveTodo(titleInputVal, memoInputVal, completedVal);
  notCompletedTodoSet();
}

function saveTodoList() {
  localStorage.setItem(TODOLIST, JSON.stringify(todoList));
}

// todo를 localStorage에 저장
function saveTodo(titleInputVal, memoInputVal, completedVal) {
  if (titleInputVal.trim() !== "" && memoInputVal.trim() !== "") {
    const todoObj = {
      id: (id += 1),
      completed: completedVal, // false_진행중, true_완료
      title: titleInputVal,
      memo: memoInputVal,
    };
    todoList.push(todoObj);
    saveTodoList();
  }
}

function loadTodoList() {
  const loadedTodoList = localStorage.getItem(TODOLIST);
  if (loadedTodoList !== null) {
    const parsedTodoList = JSON.parse(loadedTodoList);

    for (let todo of parsedTodoList) {
      const title = todo.title;
      const memo = todo.memo;
      const complete = todo.completed;
      paintTodo(title, memo, complete);
      saveTodo(title, memo, complete);
    }
  }
}

// TODO 항목의 completed 상태에 따라 스타일을 설정⭐
function setTodoStyles(todoItem) {
  const divEl_item = document.querySelector(`div[id="${todoItem.id}"]`);
  const divEl_title = divEl_item.querySelector(".todo-title");
  const divEl_memo = divEl_item.querySelector(".todo-memo");

  if (todoItem.completed) {
    completeTodo(divEl_item, divEl_title, divEl_memo);
  } else {
    notCompletedTodo(divEl_item, divEl_title, divEl_memo);
  }
}

// 페이지 로드 시 로컬 스토리지에서 TODO 항목 상태를 불러와 스타일 설정⭐
function loadTodoStylesFromLocalStorage() {
  const loadedTodoList = localStorage.getItem(TODOLIST);
  if (loadedTodoList !== null) {
    const parsedTodoList = JSON.parse(loadedTodoList);

    for (let todoItem of parsedTodoList) {
      setTodoStyles(todoItem);
    }
  }
}

// 전체 todo 삭제
function delTodoAll() {
  const allTodoItem = document.querySelectorAll(".todo-item");

  // 주석으로 해도 있는걸로 인식해서 html을 수정했더니 원하는대로 작동!
  if (todoListBox.innerText === "") {
    alert("삭제할 목록이 없습니다.");
  } else {
    // console.log(allTodoItem);
    if (confirm("정말 삭제하시겠습니까?")) {
      allTodoItem.forEach((item) => {
        item.remove();
      });
      alert("삭제되었습니다.");
      localStorage.clear();
      todoCount.innerText = "진행 중인 🥕: 0";
    }
  }
}

// todo를 웹 상에 나타내어 주기
function paintTodo(titleInputVal, memoInputVal, completedVal) {
  // console.log(completedVal)//false

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
        notCompletedTodoSet();
        saveTodoList();
      }
    });

    // title
    divEl_title.classList.add("todo-title");
    divEl_title.innerText = titleInputVal;
    divEl_item.appendChild(divEl_title);
    // title 더블 클릭시 상태전환
    divEl_title.addEventListener("dblclick", () => {
      // 해당 TODO 항목의 ID를 가져옴
      const itemId = Number(divEl_item.id);

      // 해당 TODO 항목을 찾음
      const todoItem = todoList.find((todo) => todo.id === itemId);

      // TODO 항목의 completed 상태를 토글
      todoItem.completed = !todoItem.completed;
      notCompletedTodoSet(); // 위치가 중요

      setTodoStyles(todoItem);
      saveTodoList();
    });

    // memo
    divEl_memo.classList.add("todo-memo");
    divEl_memo.innerText = memoInputVal;
    divEl_item.appendChild(divEl_memo);

    titleInput.value = "";
    memoInput.value = "";
  }
}
// 완료 todo 스타일
// 뺴서 매개변수 수여
function completeTodo(divEl_item, divEl_title, divEl_memo) {
  // true
  divEl_item.style.border = "2px solid black";
  divEl_title.style.border = "2px solid black";
  divEl_title.style.textDecoration = "line-through";
  divEl_memo.style.border = "2px solid black";
}
// 미완료 todo 스타일
// 뺴서 매개변수 수여
function notCompletedTodo(divEl_item, divEl_title, divEl_memo) {
  // false
  divEl_item.style.border = "3px solid rgb(221, 111, 8)";
  divEl_title.style.border = "2px solid rgb(129, 189, 137)";
  divEl_title.style.textDecoration = "none";
  divEl_memo.style.border = "2px solid rgb(129, 189, 137)";
}

// 전체로 보여줄 미완료 todo 스타일 설정⭐
function notCompletedTodoAll() {
  const allTodoItems = document.querySelectorAll(".todo-item");
  allTodoItems.forEach((item) => {
    const itemId = Number(item.id);
    const todoItem = todoList.find((todo) => todo.id === itemId);
    todoItem.completed = false;
    setTodoStyles(todoItem);
  });
  saveTodoList();
}

// 전체로 보여줄 완료된 todo 스타일 설정⭐
function completeTodoAll() {
  const allTodoItems = document.querySelectorAll(".todo-item");
  allTodoItems.forEach((item) => {
    const itemId = Number(item.id);
    const todoItem = todoList.find((todo) => todo.id === itemId);
    todoItem.completed = true;
    setTodoStyles(todoItem);
  });
  saveTodoList();
}
// inputBtn.addEventListener("click", createTodo)을 함수로 바꿈
function init() {
  loadTodoList(); // local Storage에 todo가 존재하는지 확인
  inputBtn.addEventListener("click", createTodo);
  notCompletedTodoSet();
}
init(); // 호출까지 해줘야 함_따로 부르는 곳이 없으니까

// 완료되지 않은 todoList를 반환
function notCompletedTodoGet() {
  return todoList.filter((todo) => {
    return todo.completed === false;
  });
}

function notCompletedTodoSet() {
  const leftTodos = notCompletedTodoGet();
  todoCount.innerHTML = `진행 중인 🥕: ${leftTodos.length}`;
}

// 페이지 로드 시 스타일 설정 적용⭐
function loadTodoStylesFromLocalStorage() {
  for (let todoItem of todoList) {
    setTodoStyles(todoItem);
  }
}
