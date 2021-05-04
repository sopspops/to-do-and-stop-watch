/* Timer */

const timer = document.getElementById('stopwatch');

var hr = 0;
var min = 0;
var sec = 0;
var stoptime = true;

function startTimer() {
    if (stoptime == true) {
        stoptime = false;
        timerCycle();
    }
}

function stopTimer() {
    if (stoptime == false) {
        stoptime = true;
    }
}

function timerCycle() {
    if (stoptime == false) {
        sec = parseInt(sec);
        min = parseInt(min);
        hr = parseInt(hr);

        sec = sec + 1;

        if (sec == 60) {
            min = min + 1;
            sec = 0;
        }
        if (min == 60) {
            hr = hr + 1;
            min = 0;
            sec = 0;
        }

        if (sec < 10 || sec == 0) {
            sec = '0' + sec;
        }
        if (min < 10 || min == 0) {
            min = '0' + min;
        }
        if (hr < 10 || hr == 0) {
            hr = '0' + hr;
        }

        timer.innerHTML = hr + ':' + min + ':' + sec;

        setTimeout("timerCycle()", 1000);

    }
}

function resetTimer() {
    timer.innerHTML = '00:00:00';
    stoptime = true;
    hr = 0;
    sec = 0;
    min = 0;
}


/* todo */

  let input = document.querySelector("#todo");
  let btn = document.querySelector("#btn");
  let list = document.querySelector("#list");
  let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  savedTasks.forEach(addTodo);

  function addTodo(txt) {
    let li = document.createElement("li");
    li.innerHTML = txt;
    list.insertBefore(li, list.childNodes[0]);
    
    const delBtn = document.createElement("i");
    delBtn.classList.add("fas", "fa-trash-alt");
    li.appendChild(delBtn);
    delBtn.addEventListener("click", (e) => {
      li.parentNode.removeChild(li);
      savedTasks = savedTasks.filter((e) => e !== txt);
      localStorage.setItem("tasks", JSON.stringify(savedTasks));
    });
  }
  
  btn.addEventListener("click", () => {
    let txt = input.value;
    if (txt === "") {
      alert("Please write something to do!");
    } else {
      savedTasks.push(txt);
      localStorage.setItem("tasks", JSON.stringify(savedTasks));
      input.value = "";
      addTodo(txt);
    }
  });
  
  list.addEventListener("click", (e) => {
    if (e.target.tagName == "LI") {
      e.target.classList.toggle("checked");
    }
  });