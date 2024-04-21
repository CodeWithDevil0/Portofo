let input = document.querySelector('.txt-input');
let content = document.querySelector('.content');
let clear = document.getElementsByClassName('.clear');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

input.addEventListener('keydown', handleCommand);

function handleCommand(event) {
    if(event.key === 'Enter') {
        const command = input.value.trim();
        input.value = '';
        content.innerHTML += `$ ${command}<br>`;
        executeCommand(command);
    }
}

function executeCommand(command) {
    switch (command) {
      case "help":
        content.innerHTML += '<p class="dummy-txt">Voici les commandes (Veuillez les entrez en minuscules merci):<br>, <span class="cmd-txt">Help</span><br>, <span class="cmd-txt">Adresse</span><br>, <span class="cmd-txt">Ip</span><br>, <span class="cmd-txt">Clear</span><br>, <span class="cmd-txt">MAJ</span><br>, <span class="cmd-txt">Moi</span></p><br>';
        break;
        case "adresse":
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
            content.innerHTML += `<span class="cmd-txt">Voici un environt de ta localisation: <a href="${url}" target="_blank">Open in Google Maps</a></span><br>`;
        }, function(error) {
            content.innerHTML += `<span class="cmd-txt">Error getting location: ${error.message}</span><br>`;
        });
    } else {
        content.innerHTML += `<span class="cmd-txt">Geolocation is not supported by your browser</span><br>`;
    }
    break;

        case "ip":
    fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        content.innerHTML += `<span class="cmd-txt">Voici ton ip: ${data.ip}</span><br>`;
    })
    .catch(error => {
        content.innerHTML += `<span class="cmd-txt">Erreur lors de la recuperation de l'ip: ${error}</span><br>`;
    });
    break;    
        case "addToDo":
            content.innerHTML += "Enter task: <br>";
            input.removeEventListener('keydown', handleCommand);
            input.addEventListener('keydown', handleAddTask);
            break;
        case "removeToDo":
            content.innerHTML += "Enter a task number to remove: <br>";
            input.removeEventListener('keydown', handleCommand);
            input.addEventListener('keydown', handleRemoveTask);
            break;
        case "listToDo":
            if (todos.length === 0) {
                content.innerHTML += "No tasks<br>";
            }else {
                for(let i=0; i < todos.length; i++) {
                    content.innerHTML += `<span class="listed-task">${i + 1}. ${todos[i]}</span><br>`;
                }
            }
            break;
        case "clear":
            setTimeout(function() {
                content.innerHTML = '<a id="clear"></a>';
                before = document.getElementById("clear");
              }, 1);
            break;
        case "moi":
            let aboutMe = document.createElement('div');
            aboutMe.classList.add('about-me');
            aboutMe.innerHTML =
            `
            <span class="about-txt">Hello i'm anonymous</a><br>
              </div>
            `

            content.appendChild(aboutMe);
            input.value = '';
            break;
          case "maj":
            let updates = document.createElement('div');
            updates.classList.add('about-me');
            updates.innerHTML =
            `
            <span class="about-txt"> 
            Updates:<br>
            Commandes: Ici les mise a jour sont souvent favoriser .
            </span>
            `

            content.appendChild(updates);
            input.value = '';
          break;
        default:
            content.innerHTML += `Erreur Commande: ${command}, La commande ne figure pas sur la liste help si besoin.<br>`;
    }
}

function handleAddTask(event) {
    if (event.key === "Enter") {
      const task = input.value.trim();
      if (task !== "") {
        todos.push(task);
        content.innerHTML += `<span class="added-task">Task added: ${task}</span><br>`;
        input.value = '';  

        localStorage.setItem('todos', JSON.stringify(todos));
      }
      input.removeEventListener("keydown", handleAddTask);
      input.addEventListener("keydown", handleCommand);
    }
  }

  function handleRemoveTask(event) {
    if (event.key === "Enter") {
      const index = parseInt(input.value) - 1;
      if (isNaN(index) || index < 0 || index >= todos.length) {
        content.innerHTML += "Invalid task number<br>";
        input.value = '';
      } else {
        const task = todos[index];
        todos.splice(index, 1);
        content.innerHTML += `<span class="removed-task">Task removed: ${task}</span><br>`;
        input.value = '';

        localStorage.setItem('todos', JSON.stringify(todos));
      }
      input.removeEventListener("keydown", handleRemoveTask);
      input.addEventListener("keydown", handleCommand);
    }
  }
