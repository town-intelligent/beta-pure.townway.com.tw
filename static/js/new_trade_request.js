const doneBtn = document.getElementById('doneBtn');
doneBtn.addEventListener("click", function () {
  var form = new FormData();
  var email = getLocalStorage("email");
  var name = document.getElementById("task_name").value; // "test001";
  var overview = document.getElementById("overview").value; // "overview123";
  var token = document.getElementById("token").value;
  // var token = document.getElementById("people").value;
  // var token = document.getElementById("point").value;
  //   var obj_sed = {};
  // var index_chk_box = 0;
  // while (true) {
  //   if (document.getElementById("gridCheck" + (++index_chk_box).toString()) == null) {
  //     break;
  //   }
  //   if (document.getElementById("gridCheck" + (index_chk_box).toString()).checked) {
  //     checkArray.push(document.getElementById("gridCheck" + (index_chk_box).toString()).value);
  //   }
  // }
  // obj_sed.hhhhhhh = checkArray;
  // if (document.getElementById("otherCheck") != null) {
  //   checkArray.push("其他");
  //   obj_sed.others = document.getElementById("textArea").value;
  // }
  var cover = getLocalStorage("task_cover"); // `${TASK_COVER}`;
  var balance = getLocalStorage("balance");
   if (parseFloat(balance) >= parseFloat(token)) {
    form.append("email", email);
    form.append("name", name);
    form.append("token", token);
    // form.append("people", people);
    // form.append("point", point);
    // form.append("description", JSON.stringify(obj_sed));
    form.append("overview", overview);
    form.append("cover", cover);
    form.append("balance", balance);
    let settings = {
      "url": `https://isu-backend.townway.com.tw/trade_request/add`,
      "method": "POST",
      "timeout": 0,
      "processData": false,
      "mimeType": "multipart/form-data",
      "contentType": false,
      "data": form,
    };

    $.ajax(settings).done(function (res) {
      console.log(res);
      window.location.replace("/trade.html");
    });
   }
   else {
     console.log("餘額不夠");
     window.alert("很抱歉，您的時間餘額不夠導致交易無法送出")
   }
});