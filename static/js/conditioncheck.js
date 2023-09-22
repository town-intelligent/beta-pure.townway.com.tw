const doneBtn = document.getElementById('testBtn');
doneBtn.addEventListener("click", function () {
  var form = new FormData();
  var uuid = "1234567890";
  //var email = getLocalStorage("email");
  var email = "bx72777@gmail.com";

  form.append("uuid", uuid);
  form.append("email", email);

  let settings = {
    "url": `http://127.0.0.1:8000/tasks/condition`,
    "method": "POST",
    "timeout": 0,
    "processData": false,
    "mimeType": "multipart/form-data",
    "contentType": false,
    "data": form,
  };

  $.ajax(settings).done(function (res) {
    console.log(res);
    //window.location.replace("/trade.html");
  });
  }
);