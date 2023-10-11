// 1차버전
const titleInput = document.querySelector(".todo-title-input"); // 할일입력input
const memoInput = document.querySelector(".todo-memo-input"); // 메모입력input
const todoBtn = document.querySelector(".todo-input-btn"); // 입력btn

const title = document.querySelector(".todo-title"); // 할일나오는div
const memo = document.querySelector(".todo-memo"); // 메모나오는div

const todoListBox = document.querySelector("todo-list"); // todo나오는 전체공간
const todoItemBox = document.querySelector("todo-item"); // todo하나하나

// todo입력
function createTodo(e) {
  e.preventDefault();

  // const allTodos = getAllTodos();

  // 날짜구하기
  let today = new Date();
  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1; // 월
  let date = today.getDate(); // 날짜

  const titleInputVal = titleInput.value; // 할일값
  const memoInputVal = memoInput.value; // 메모값
  let dateVal = document.querySelector(".todo-create-date")


  const divEl = document.createElement("div"); // div요소
  const btnEl = document.createElement("dutton"); // btn요소

  if (titleInputVal === "") {
    alert("할 일을 입력하세요.");
  } else if (memoInputVal === "") {
    alert("내용을 입력하세요.");
  } else {
    // title, memo
    title.innerHTML = titleInputVal;
    memo.innerHTML = memoInputVal;
    dateVal.innerText = `${year}-${month}-${date}`
    todoItemBox.appendChild(divEl);
    todoItemBox.appendChild(divEl);
    titleInputVal = "";
    memoInputVal = "";
  }
}

todoBtn.addEventListener("click", createTodo);
