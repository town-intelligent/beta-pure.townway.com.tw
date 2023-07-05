function set_page_info_verifier_cms_content(){
  // Params
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  var task = urlParams.get("task")

  var obj_task = get_task_info(task);
  console.log(JSON.stringify(obj_task));
}

function delete_task() {
  var urlParams = new URLSearchParams(window.location.search);
  var uuid = urlParams.get('task');
  var form = new FormData();
  form.append("email", "test1@gmail.com");
  form.append("uuid", uuid);

  var settings = {
    "url": "https://beta-tplanet-backend.townway.com.tw/tasks/del_task",
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
}

function uuid_to_modify(){
  var urlParams = new URLSearchParams(window.location.search);
  var uuid = urlParams.get('task');
  window.location.replace('verifier-cms-modify.html?task='+ uuid)
}