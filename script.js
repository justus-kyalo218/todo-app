// Load tasks from localStorage on page load
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const taskList = document.getElementById("taskList");
  const li = document.createElement("li");
  li.textContent = taskText;

  // Toggle complete on click
  li.addEventListener("click", function () {
    li.classList.toggle("completed");
    saveTasks();
  });

  // Add delete button
  const delBtn = document.createElement("span");
  delBtn.textContent = "×";
  delBtn.onclick = function (e) {
    e.stopPropagation();
    li.remove();
    saveTasks();
  };

  li.appendChild(delBtn);
  taskList.appendChild(li);
  taskInput.value = "";
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({ text: li.textContent.replace("×", ""), completed: li.classList.contains("completed") });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const saved = JSON.parse(localStorage.getItem("tasks")) || [];
  saved.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.completed) li.classList.add("completed");

    const delBtn = document.createElement("span");
    delBtn.textContent = "×";
    delBtn.onclick = function (e) {
      e.stopPropagation();
      li.remove();
      saveTasks();
    };

    li.appendChild(delBtn);
    li.addEventListener("click", function () {
      li.classList.toggle("completed");
      saveTasks();
    });

    document.getElementById("taskList").appendChild(li);
  });
}
