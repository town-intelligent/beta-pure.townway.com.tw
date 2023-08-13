function set_page_info_verifier_cms_modify(){
  // Params
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  var task = urlParams.get("task")

  var obj_task = get_task_info(task);
  console.log(JSON.stringify(obj_task));
}

// Params
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var uuid = urlParams.get("task");

let settings = {
  "url": `${HOST_URL_TPLANET_DAEMON}/tasks/get/${uuid}`,
  "method": "GET",
  "timeout": 0,
  "processData": false,
  "mimeType": "multipart/form-data",
  "contentType": false,
};

$.ajax(settings).done(async function (res) {
  const obj = JSON.parse(res);
  await renderTask(obj);
});

function renderTask(taskData){

  console.log(JSON.stringify(taskData));
  const cover = document.getElementById('cover');
  const taskName = document.getElementById('taskName');
  const taskContent = document.getElementById('taskContent');
  const coverContent = `<img id="task_cover" class="img-fluid" src=${HOST_URL_TPLANET_DAEMON}${taskData.thumbnail} alt="">`
  cover.innerHTML = coverContent;
  taskName.value = taskData.name;
  taskContent.textContent = taskData.overview;
  document.getElementById('token').value = taskData.token;
}

document.addEventListener('DOMContentLoaded', function() {
  const doneBtn = document.getElementById('doneBtn');
  doneBtn.addEventListener("click", function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var uuid = urlParams.get("task");
    //var form = new FormData();
    // form.append("uuid", "00000001");
    // form.append("tasks", "[{\"sdg\":1, \"des\":\"123\"}, {\"sdg\":2, \"des\":\"456\"}, {\"sdg\":3, \"des\":\"789\"}]");
    // form.append("email", "400@gmail.com");
    // form.append("token", "70");
    // form.append("type", "1");
    // form.append("name", "GPS-Test-C1");
    // form.append("overview", "overview123");
    // form.append("cover", "");
    // form.append("gps_flag", "true");

    // var settings = {
    //   "url": "https://beta-tplanet-backend.townway.com.tw/tasks/new",
    //   "method": "POST",
    //   "timeout": 0,
    //   "processData": false,
    //   "mimeType": "multipart/form-data",
    //   "contentType": false,
    //   "data": form
    // };

    // $.ajax(settings).done(function (response) {   "[{\"sdg\":1, \"des\":\"123\"}, {\"sdg\":2, \"des\":\"456\"}, {\"sdg\":3, \"des\":\"789\"}]"
    //   console.log(response);
    // });
    //var path = window.location.pathname;
     var form = new FormData();
     var email = "400@gmail.com";
     var type = "1";
     var name = document.getElementById("taskName").value; 
     var overview = document.getElementById("taskContent").value;
     var token = document.getElementById("token").value; 
     var cover = getLocalStorage("task_cover");
    
     form.append("uuid", "00000001");  
     form.append("task", uuid)
     form.append("tasks", "[{\"sdg\":1, \"des\":\"123\"}, {\"sdg\":2, \"des\":\"456\"}, {\"sdg\":3, \"des\":\"789\"}]");
     form.append("email", email);
     form.append("token", token);
     form.append("type", type);
     form.append("name", name);
     form.append("overview", overview);
     form.append("cover", cover);
     form.append("gps_flag", "true");

     var settings = { 
       "url": `${HOST_URL_TPLANET_DAEMON}/tasks/new`,
       "method": "POST",
       "timeout": 0,
       "processData": false,
       "mimeType": "multipart/form-data",
       "contentType": false,
       "data": form
     };

     $.ajax(settings).done(function (response) {
       console.log(response);
       window.location.replace('/verifier-cms-list.html');
     });
  });
});
