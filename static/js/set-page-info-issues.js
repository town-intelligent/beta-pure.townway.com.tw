const str_issue_block = `<div class="card">
  <div class="card-header bg-white p-0">
    <a href="/verifier-cms-content.html?task=TASK_UUID" class="d-block">
      <div class="bg-cover" style="background-image: url(${HOST_URL_TPLANET_DAEMON}TASK_COVER); height: 150px; background-repeat: no-repeat" ></div>
    </a>
  </div>
  <div class="card-body p-2">
    <p class="card-text">TASK_NAME</p>
  </div>
</div>`

function set_page_info_issues() {
  var list_task_UUIDs = list_tasks(getLocalStorage("username"));
  var task_container = document.getElementById("issues-list");
  
  for (var index = 0; index < list_task_UUIDs.length; index++) {
    var obj_task = get_task_info(list_task_UUIDs[index]);
    console.log(JSON.stringify(obj_task));

    var obj_task_block = document.createElement("div");
    obj_task_block.className = "col-md-4"; //"col-10 mt-3";

    var str_inner = str_issue_block.replaceAll("TASK_NAME", obj_task.name);
    str_inner = str_inner.replaceAll("TASK_UUID", obj_task.uuid);
    str_inner = str_inner.replaceAll("TASK_COVER", obj_task.thumbnail);

    obj_task_block.innerHTML = str_inner;
    task_container.append(obj_task_block);
  }

  console.log(task_container);
}