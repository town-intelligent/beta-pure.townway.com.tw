function edit_username() {
  var username = document.getElementById("username").value;

  // Modify account
  var dataJSON = {};
  dataJSON.email = getLocalStorage("email");
  dataJSON.username = username;
  $.ajax({
    url: HOST_URL_EID_DAEMON + "/accounts/modify",
    type: "POST",
    async: false,
    crossDomain: true,
    data:  dataJSON,
    success: function(returnData) {
       const obj = JSON.parse(returnData);
       // Reset localStorage
       setLocalStorage("username", obj.username);
       window.location.replace("/choice.html");
    },
    error: function(xhr, ajaxOptions, thrownError){
      console.log(thrownError);
    }
  });
}

function logout() {
  // Modify account
  var dataJSON = {};
  dataJSON.token = getLocalStorage("jwt");
  $.ajax({
    url: HOST_URL_EID_DAEMON + "/accounts/verify_jwt",
    type: "POST",
    async: false,
    crossDomain: true,
    data:  dataJSON,
    success: function(returnData) {
       const obj = JSON.parse(returnData);
       // Reset localStorage
       setLocalStorage("jwt", "");
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
  dataJSON.email = getLocalStorage("email");
  $.ajax({
    url: HOST_URL_EID_DAEMON + "/accounts/get_avatar_img",
    type: "POST",
    async: false,
    crossDomain: true,
    data:  dataJSON,
    success: function(returnData) {
       const obj = JSON.parse(returnData);
       // Reset localStorage
       setLocalStorage("avatar_img", obj.url);
    },
    error: function(xhr, ajaxOptions, thrownError){
      console.log(thrownError);
    }
  });

  return "OK"
}

function get_group() {
  const form = new FormData();
  const userEmail = getLocalStorage('email');
  var dataJason = {};
  form.append("email", userEmail);

  let settings = {
    "url": `${HOST_URL_EID_DAEMON}/accounts/get_group`,
    "method": "POST",
    "timeout": 0,
    "processData": false,
    "mimeType": "multipart/form-data",
    "contentType": false,
    "data": form,
    "async": false
  };

  $.ajax(settings).done(/*async*/ function (res) {
    const obj = JSON.parse(res);
    dataJason =  obj;
  });

  return dataJason;
}

function get_des(){
  const form = new FormData();
  // const userEmail = getLocalStorage('email');
  // const userEmail = "200@gmail.com";
  // const userGroup = "202";
  //form.append("group", userGroup);
  form.append("email", getLocalStorage('email'));
  var dataJason = {};

  
    
    let settings = {
      url: `${HOST_URL_EID_DAEMON}/accounts/get_description`,
      method: "POST",
      timeout: 0,
      processData: false,
      mimeType: "multipart/form-data",
      contentType: false,
      data: form,
      async: false
    };

    $.ajax(settings).done(function (skillRes) {
      const skillObj = JSON.parse(skillRes);
      dataJason = skillObj;
    });

  return dataJason;
}

function get_type(event) {
      event.preventDefault();
      var linkText = event.target.textContent;
      var nextPageURL = '../trade-request.html?text=' + encodeURIComponent(linkText);
      window.location.href = nextPageURL;
    }