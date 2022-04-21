function setInfoEid() {
  // Set username
  $("#userid").text(getCookie("username"));

  // Set balance
  var dataJSON = {};
  dataJSON.email = getCookie("email");
  dataJSON.ec = 0;
  $.ajax({
    url: HOST_URL_EID_DAEMON + "/accounts/balance",
    type: "POST",
    async: false,
    crossDomain: true,
    data:  dataJSON,
    success: function(returnData) {
       const obj = JSON.parse(returnData);
       // Set balance
       var balance = document.getElementById("balance");
       balance.innerHTML = obj;
    },
    error: function(xhr, ajaxOptions, thrownError){
      console.log(thrownError);
    }
  });

  // Update avatar
  getAvatarImg(getCookie("email"))
  pathAvatarImg = getCookie("avatar_img");
  console.log(pathAvatarImg);
  var obj_img_avatar = document.getElementById("img_avatar");
  obj_img_avatar.style.backgroundImage = "url(" + HOST_URL_EID_DAEMON + pathAvatarImg  +  ")";
  console.log(obj_img_avatar.style.backgroundImage);
}

function setPageInfo() {
  var path = window.location.pathname;
  var page = path.split("/").pop();
  console.log( page );

  if (page == "eid.html") {
    setInfoEid();
  } else if (page.includes("issue")) {
    $("#nav-issues").addClass("active");
    
    // List issues
    if (page === "issues.html") {
      list_issues(getCookie("username"));
    } else if (page === "issue-executor.html") {
      // Get task
      var queryString = window.location.search;
      var urlParams = new URLSearchParams(queryString);
      var uuid = urlParams.get("uuid");

      // Set Task
      setCookie("target", uuid, 1);

      obj_task = JSON.parse(getCookie(getCookie("target")));

      document.getElementById("task_name").innerHTML = obj_task.name;
      document.getElementById("task_balance").innerHTML = obj_task.token;
      document.getElementById("task_summary").style.visibility = "hidden";
    } else if (page === "issue-verifier.html") {
      // Get all tasks and users
      var str_list_task_UUIDs = getCookie("list_tasks");
      var list_task_UUIDs  = [];
      if (str_list_task_UUIDs === "") {
        // Get user task UUIDs
        list_task_UUIDs = list_tasks(getCookie("username"));
        setCookie("list_tasks", JSON.stringify(list_task_UUIDs), 1);
      } else {
        list_task_UUIDs = str_list_task_UUIDs.split(",");
      }

      // Ready to verified tasks
      for (var index = 0; index < list_task_UUIDs.length; index ++) {
        updateVerifyTasksTable(list_task_UUIDs[index]);
      }
    }
  
  }else if (page == "foot_print.html") {
    $("#nav-foot_print").addClass("active");

    // Submit weight and clear all ticket
    // TODO: clear all tickets
    // submit_weight();
    
  } else if (page == "wallet.html") {
    $("#nav-wallet").addClass("active");
  } else if (page == "edit-info.html") {
    document.getElementById("email").innerHTML = getCookie("email");
    document.getElementById("username").value = getCookie("username");

    // Update avatar
    getAvatarImg(getCookie("email"))
    pathAvatarImg = getCookie("avatar_img");
    console.log(pathAvatarImg);
    var obj_img_avatar = document.getElementById("btn_avatar_img").firstChild;
    obj_img_avatar.style.backgroundImage = "url(" + HOST_URL_EID_DAEMON + pathAvatarImg  +  ")";
    console.log(obj_img_avatar.style.backgroundImage);
  } else if (page == "signup.html" || page == "signin.html") {
      console.log("in setpageinfo signup.html"); 
      var token = getCookie("jwt");

      if (token == "") {
        return;
      }

      var dataJSON = {};
      dataJSON.token =  token;

      $.ajax({
        url: HOST_URL_EID_DAEMON + "/accounts/verify_jwt",
        type: "POST",
        async: false,
        crossDomain: true,
        data:  dataJSON,
        success: function(returnData) {
          const obj = JSON.parse(returnData);
          if (obj.result) {
            console.log("JWT still avliable");
            // Redirect to eID page
	    window.location.replace("/eid.html");
          } else {
	    // OK for signup, just return
	    console.log("JWT still NOT avliable");
	    return;
          }
        },
        error: function(xhr, ajaxOptions, thrownError){
          console.log(thrownError);
        }
      });
  }
}
