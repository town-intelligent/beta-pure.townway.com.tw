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
  const coverContent = `<img class="img-fluid" src=${HOST_URL_TPLANET_DAEMON}${taskData.thumbnail} alt="">`
  cover.innerHTML = coverContent;
  taskName.textContent = taskData.name;
  taskContent.textContent = taskData.overview;
  document.getElementById('token').innerHTML = taskData.token;

  var obj_qrcode_task = document.createElement("qrcode_task");

  var qrcode_task = new QRCode(obj_qrcode_task, {
    width : 250,
    height : 250
  });

  qrcode_task.style = "width:100px; height:100px; margin-top:15px;";
  qrcode_task.makeCode(HOST_URL_TPLANET_DAEMON + "/tasks/" + taskData.uuid);

  document.getElementById("task_qrcode").append(obj_qrcode_task);

  var obj_qrcode_verifier = document.createElement("qrcode_verifier");

  var qrcode_verifier = new QRCode(obj_qrcode_verifier, {
    width : 250,
    height : 250
  });

  qrcode_verifier.style = "width:100px; height:100px; margin-top:15px;";
  qrcode_verifier.makeCode(HOST_URL_EID_DAEMON + "issue-verifier.html");

  document.getElementById("verifier_qrcode").append(obj_qrcode_verifier);
}
