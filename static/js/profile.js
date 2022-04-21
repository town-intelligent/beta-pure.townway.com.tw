function edit_username() {
  var username = document.getElementById("username").value;

  // Modify account
  var dataJSON = {};
  dataJSON.email = getCookie("email");
  dataJSON.username = username;
  $.ajax({
    url: HOST_URL_EID_DAEMON + "/accounts/modify",
    type: "POST",
    async: false,
    crossDomain: true,
    data:  dataJSON,
    success: function(returnData) {
       const obj = JSON.parse(returnData);
       // Reset Cookie
       setCookie("username", obj.username, 1);
       window.location.replace("/eid.html");
    },
    error: function(xhr, ajaxOptions, thrownError){
      console.log(thrownError);
    }
  });
}

function logout() {
  // Modify account
  var dataJSON = {};
  dataJSON.token = getCookie("jwt");
  $.ajax({
    url: HOST_URL_EID_DAEMON + "/accounts/verify_jwt",
    type: "POST",
    async: false,
    crossDomain: true,
    data:  dataJSON,
    success: function(returnData) {
       const obj = JSON.parse(returnData);
       // Reset Cookie
       setCookie("jwt", "", 1);
       window.location.replace("/index.html");
    },
    error: function(xhr, ajaxOptions, thrownError){
      console.log(thrownError);
    }
  });
}

function getAvatarImg() {
  // Modify account
  var dataJSON = {};
  dataJSON.email = getCookie("email");
  $.ajax({
    url: HOST_URL_EID_DAEMON + "/accounts/get_avatar_img",
    type: "POST",
    async: false,
    crossDomain: true,
    data:  dataJSON,
    success: function(returnData) {
       const obj = JSON.parse(returnData);
       // Reset Cookie
       setCookie("avatar_img", obj.url, 1);
    },
    error: function(xhr, ajaxOptions, thrownError){
      console.log(thrownError);
    }
  });

  return "OK"
}
