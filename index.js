// 2차버전
const titleInput = document.querySelector(".todo-title-input"); // 할일입력input
const memoInput = document.querySelector(".todo-memo-input"); // 메모입력input
const todoBtn = document.querySelector(".todo-input-btn"); // 입력btn

const title = document.querySelector(".todo-title"); // 할일나오는div
const memo = document.querySelector(".todo-memo"); // 메모나오는div

// todo입력
function createTodo(e) {
  e.preventDefault();

  const todoListBox = document.querySelector(".todo-list"); // todo나오는 전체공간
  const todoItemBox = document.querySelector(".todo-item"); // todo하나하나

  // 날짜구하기
  let today = new Date();
  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1; // 월
  let date = today.getDate(); // 날짜

  const titleInputVal = titleInput.value; // 할일값
  const memoInputVal = memoInput.value; // 메모값

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

    // title
    divEl_title.classList.add("todo-title");
    divEl_title.innerText = titleInputVal;
    divEl_item.appendChild(divEl_title);

    // memo
    divEl_memo.classList.add("todo-memo");
    divEl_memo.innerText = memoInputVal;
    divEl_item.appendChild(divEl_memo);

    // 입력창 초기화
    titleInput.value = "";
    memoInput.value = "";
  }
}

// 입력 btn
todoBtn.addEventListener("click", createTodo);
