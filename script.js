document.addEventListener("DOMContentLoaded", () => {
  const goToday = document.getElementById("goToday");
  const prevButton = document.getElementById("prevButton");
  const currentDate = document.getElementById("currentDate");
  const nextButton = document.getElementById("nextButton");
  const todoCount = document.querySelector(".todoCount");
  const todoInput = document.getElementById("todoInput");
  const appendTodo = document.querySelector(".appendTodo");
  const mainContainer = document.querySelector("main");

  // todo 리스트 컨테이너 div 태그 추가
  const todoListContainer = document.createElement("div");
  mainContainer.appendChild(todoListContainer);

  // 날짜별 투두리스트 저장
  let todos = {};

  // 마지막으로 선택된 날짜 (session 우선, 없으면 local)
  const savedDate = sessionStorage.getItem("lastSelectedDate");

  // 날짜 디폴트값 : 당일
  function setToday() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // 1~9월 앞에 0 붙임
    const dd = String(today.getDate()).padStart(2, "0"); // 1~9일 앞에 0 붙임

    const defaultDate = `${yyyy}-${mm}-${dd}`;
    currentDate.value = defaultDate;

    sessionStorage.setItem("lastSelectedDate", defaultDate);

    loadTodos();
    renderTodos(defaultDate);
  }

  // 페이지 새로고침 / 처음 열었을 때
  function setInitialDate() {
    loadTodos();

    if (savedDate) {
      currentDate.value = savedDate;
    } else {
      setToday();
      return;
    }
    renderTodos(currentDate.value);
  }

  setInitialDate(); // 페이지 로딩 시 날짜 설정

  // 날짜 변경
  function changeDate(days) {
    // value를 연도, 월, 일로 분리
    const [year, month, day] = currentDate.value.split("-").map(Number);
    const selectedDate = new Date(year, month - 1, day); // JS에서 month는 0~11
    selectedDate.setDate(selectedDate.getDate() + days);

    const yyyy = selectedDate.getFullYear();
    const mm = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const dd = String(selectedDate.getDate()).padStart(2, "0");
    currentDate.value = `${yyyy}-${mm}-${dd}`;

    sessionStorage.setItem("lastSelectedDate", currentDate.value);
    renderTodos(currentDate.value);
  }

  // 버튼 클릭 시 날짜 변경
  prevButton.addEventListener("click", () => {
    changeDate(-1);
  });
  nextButton.addEventListener("click", () => {
    changeDate(1);
  });

  // 달력에서 날짜 변경
  currentDate.addEventListener("change", () => {
    sessionStorage.setItem("lastSelectedDate", currentDate.value); // 선택한 날짜 저장
    renderTodos(currentDate.value);
  });

  // Todo 추가
  appendTodo.addEventListener("click", () => {
    const text = todoInput.value.trim();
    if (!text) return;

    if (!todos[currentDate.value]) todos[currentDate.value] = [];
    todos[currentDate.value].push({ text, checked: false }); // todo 객체 형태로 저장

    todoInput.value = ""; // 입력값 초기화
    saveTodos();
    renderTodos(currentDate.value);
  });
  todoInput.addEventListener("keydown", (event) => {
    if (event.isComposing) return; // 입력(조합) 중일 때 무시
    if (event.key === "Enter") {
      appendTodo.click();
    }
  });

  // Todo 렌더링
  function renderTodos(date) {
    // 기존 목록 초기화
    while (todoListContainer.firstChild) {
      todoListContainer.removeChild(todoListContainer.firstChild);
    }
    const list = todos[date] || [];

    list.forEach((todo, index) => {
      const div = document.createElement("div");
      div.className = "listContainer";

      // 체크박스
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "checkboxButton";
      checkbox.id = `checkbox-${index}`;
      checkbox.checked = todo.checked;
      // todo 내용
      const todoContent = document.createElement("span");
      todoContent.className = "todoContent";
      todoContent.textContent = todo.text;
      // 삭제
      const deleteButton = document.createElement("button");
      deleteButton.className = "deleteButton";
      deleteButton.textContent = "x";

      div.appendChild(checkbox);
      div.appendChild(todoContent);
      div.appendChild(deleteButton);

      todoListContainer.appendChild(div);

      // 체크박스
      checkbox.addEventListener("change", () => {
        todo.checked = checkbox.checked;
        saveTodos();
        renderTodos(date); // 상태 반영 위해 다시 렌더링
      });

      // 투두 삭제
      deleteButton.addEventListener("click", () => {
        todos[date].splice(index, 1);
        saveTodos();
        renderTodos(date);
      });
    });

    // 투두 개수
    todoCount.textContent = `${list.filter((todo) => !todo.checked).length} 개`;
  }

  // 투두 리스트 로컬 스토리지에 저장
  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  // 투두 리스트 로드
  function loadTodos() {
    const data = localStorage.getItem("todos");
    if (data) {
      todos = JSON.parse(data);
    }
  }

  // 페이지 로드 시 투두리스트 로드
  loadTodos();

  // Todo-List 클릭 -> 오늘 날짜로
  goToday.addEventListener("click", () => {
    setToday();
  });
});
