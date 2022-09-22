const str_task_block = `<div class="card mb-4 rounded-0">
<div class="d-flex justify-content-center">
  <div class="img-fluid bg-cover" style="background-image:url( ${HOST_URL_TPLANET_DAEMON}TASK_COVER); width:100% ;height:120px"></div>
</div>
<div class="card-body p-2">
  <a href="/verifier-cms-content.html?task=TASK_UUID" class="mb-0">TASK_NAME</a>
</div>
</div>`

function set_page_info_verifier_cms_list(list_tasks) {
  var task_container = document.getElementById("task_container");

  for (var index = 0; index < list_tasks.length; index++) {
    var obj_task = get_task_info(list_tasks[index]);
    console.log(JSON.stringify(obj_task));

    var obj_task_block = document.createElement("div");
    obj_task_block.className = "col-sm-4";

    var str_inner = str_task_block.replaceAll("TASK_NAME", obj_task.name);
    str_inner = str_inner.replaceAll("TASK_UUID", obj_task.uuid);
    str_inner = str_inner.replaceAll("TASK_COVER", obj_task.thumbnail);

    obj_task_block.innerHTML = str_inner;
    task_container.append(obj_task_block);
  }
}