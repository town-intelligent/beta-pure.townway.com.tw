const doneBtn = document.getElementById('doneBtn');
doneBtn.addEventListener("click", function () {
  var form = new FormData();
  var uuid = "00000001";
  var email = "yillkid@gmail.com";
  var type = "1";
  var name = document.getElementById("task_name").value; // "test001";
  var overview = document.getElementById("overview").value; // "overview123";
  var token = document.getElementById("token").value; // "test001";
  var cover = getLocalStorage("task_cover"); // `${TASK_COVER}`;

  form.append("uuid", uuid);
  form.append("email", email);
  form.append("type", type);
  form.append("name", name);
  form.append("token", token);
  form.append("overview", overview);
  form.append("cover", cover);

  let settings = {
    "url": `http://127.0.0.1:8000/tasks/new`,
    "method": "POST",
    "timeout": 0,
    "processData": false,
    "mimeType": "multipart/form-data",
    "contentType": false,
    "data": form,
    "headers": {
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRFToken": getCookie('csrftoken'),  // 使用getCookie函數獲取CSRF標記值
    }
  };

  $.ajax(settings).done(function (res) {
    console.log(res);
    // window.location.replace("/verifier-cms-list.html");
  });
});
