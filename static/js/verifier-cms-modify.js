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
var uuid = urlParams.get("task")


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

const doneBtn = document.getElementById('doneBtn');
document.addEventListener('DOMContentLoaded', function() {
  doneBtn.addEventListener("click", function () {
    var form = new FormData();
    var uuid = "00000001";
    var email = "yillkid@gmail.com";
    var type = "1";
    var name = document.getElementById("taskname").value; // "test001";
    var overview = document.getElementById("taskContent").value;// "overview123";
    var token = document.getElementById("token").value; // "test001";
    var cover = getLocalStorage("task_cover");//`${TASK_COVER}`;
    
    form.append("uuid", uuid);
    form.append("email", email);
    form.append("type", type);
    form.append("name", name);
    form.append("token", token);
    form.append("overview", overview);
    form.append("cover", cover);

    
    var settings = {
      "url": "https://beta-tplanet-backend.townway.com.tw/tasks/new",
      "method": "POST",
      "timeout": 0,
      "processData": false,
      "mimeType": "multipart/form-data",
      "contentType": false,
      "data": form
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      window.location.replace("/verifier-cms-list.html");
    });
  });
});