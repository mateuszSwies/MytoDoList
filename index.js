const inputTask = document.querySelector("#inputTask");
const addTaskBtn = document.querySelector("#button-add");
const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const tasksContainer = document.querySelector("#tasksContainer");
const tasksArr = [];
const showTasksBtn = document.querySelector("#showTasks");

//add new task function
const addNewTask = (e) => {
	let text = inputTask.value;
	if (!text) {
		alert("You need to add some text!");
		return;
	}
	inputTask.value = "";
	const task = document.createElement("li");
	task.classList.add("row");
	task.innerHTML = `<div class="card mb-3 text-center">
    <div class="card-body">
      <p>${text}</p>
    </div>
    <div class="card-footer d-flex justify-content-around">
      <button class="btn btn-xs btn-success">DONE</button>
      <button class="btn btn-xs btn-danger">REMOVE</button>
    </div>
  </div>`;

	tasksArr.push(task);
	tasksArr.forEach((t) => tasksContainer.appendChild(task));

	//mark task as a done
	const doneBtn = task.querySelector(".btn-success");
	const markAsDone = (e) => {
		const taskCross = e.path[2].querySelector("p");
		taskCross.style.textDecoration = "line-through";
	};
	doneBtn.addEventListener("click", markAsDone);

	//remove tasks
	const removeBtn = task.querySelector(".btn-danger");
	const removeTask = () => {
		tasksContainer.removeChild(task);
		function spliceArrayElement(arr, element) {
			if (arr.includes(element)) {
				const index = arr.indexOf(element);
				arr.splice(index, 1);
			}
		}
		spliceArrayElement(tasksArr, task);
	};
	removeBtn.addEventListener("click", removeTask);
};

//search function
const searchTask = (e) => {
	e.preventDefault();
	let searchTxt = searchInput.value.toLowerCase();
	searchInput.value = "";
	const doneSearch = tasksArr.filter((el) =>
		el.textContent.toLowerCase().includes(searchTxt)
	);
	tasksContainer.innerHTML = "";
	doneSearch.forEach((el) => tasksContainer.appendChild(el));
};

addTaskBtn.addEventListener("click", addNewTask);
searchBtn.addEventListener("click", searchTask);
inputTask.addEventListener("keydown", (e) => {
	if (e.keyCode == 13) {
		addNewTask();
	}
});

//showing all tasks after searching
showTasksBtn.addEventListener("click", () => {
	tasksArr.forEach((t) => tasksContainer.appendChild(t));
});
