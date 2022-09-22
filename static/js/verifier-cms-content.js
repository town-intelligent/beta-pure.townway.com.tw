function set_page_info_verifier_cms_content(){
  // Params
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  var task = urlParams.get("task")

  var obj_task = get_task_info(task);
  console.log(JSON.stringify(obj_task));
}