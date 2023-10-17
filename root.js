function renderTask(taskData) {
  // TODO: escape userInput to prevent XSS
  return `
    <div class="task">
    <div class="title">
      <h2>${taskData.title}
        <button class="delete-btn">X</button>
      </h2>
    </div>
    <div class="description">
      <p>${taskData.description}</p>
    </div>
  </div>
  `
}

const taskList = document.querySelector("#task-list")

// get data from server
fetch("http://api.localhost:3000")
  .then((response) => response.json())
  .then((data) => {
    taskList.innerHTML = data.map(renderTask).join("")
  })
  .catch((err) => {
    // TODO: return more informative error to user
    console.log(err)
  })
