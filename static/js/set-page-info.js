function setInfoEid() {
  // Set username
  $("#userid").text(getLocalStorage("username"));

  // Set balance
  var dataJSON = {};
  dataJSON.email = getLocalStorage("email");
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
  getAvatarImg(getLocalStorage("email"))
  pathAvatarImg = getLocalStorage("avatar_img");
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
    var group = get_account_group();

    if (group.group != "202") {
      set_account_group("203");
    }

    document.getElementById("email").innerHTML = getLocalStorage("email");
    document.getElementById("balance").innerHTML = getLocalStorage("balance");
    var obj_group = get_group();
    if (obj_group.group == "200" || obj_group.group == "201"){
      document.getElementById("group").innerHTML = "驗證者";
    } else {
      document.getElementById("group").innerHTML = "志工";
    }

    var obj_des = get_des();
    if (obj_des.result == true){
      var list_skills = obj_des.description.hhhhhhh;
      for(var index_skill = 0; index_skill<list_skills.length; index_skill++) {
        if (list_skills[index_skill] == "行政支援") {
          document.getElementById("gridCheck1").checked = true;
        }
        if (list_skills[index_skill] == "課業輔導") {
          document.getElementById("gridCheck2").checked = true;
        }
        if (list_skills[index_skill] == "社區服務") {
          document.getElementById("gridCheck3").checked = true;
        }
        if (list_skills[index_skill] == "生活扶助") {
          document.getElementById("gridCheck4").checked = true;
        }
        if (list_skills[index_skill] == "電腦科技") {
          document.getElementById("gridCheck5").checked = true;
        }
        if (list_skills[index_skill] == "環保教育") {
          document.getElementById("gridCheck6").checked = true;
        }
        if (list_skills[index_skill] == "藝術文化") {
          document.getElementById("gridCheck7").checked = true;
        }
        if (list_skills[index_skill] == "健康醫療") {
          document.getElementById("gridCheck8").checked = true;
        }
        if (list_skills[index_skill] == "權益倡導") {
          document.getElementById("gridCheck9").checked = true;
        }
        if (list_skills[index_skill] == "國際交流") {
          document.getElementById("gridCheck10").checked = true;
        }
        if (list_skills[index_skill] == "其他") {

          if (obj_des.description.others == ""){
            document.getElementById("otherCheck").checked = false;
          } else {
            document.getElementById("otherCheck").checked = true;
            document.getElementById("textArea").style.display = "block";
            document.getElementById("textArea").value = obj_des.description.others;
          }
        }
      }
    }
    setInfoEid();
  } else if (page.includes("issue")) {
    $("#nav-issues").addClass("active");
    
    // List issues
    if (page === "issues.html") {
      list_issues(getLocalStorage("email"));
      set_page_info_issues();
    } else if (page === "issue-executor.html") {
      // Get task
      var queryString = window.location.search;
      var urlParams = new URLSearchParams(queryString);
      var uuid = urlParams.get("task");

      // Set Task
      setLocalStorage("target", uuid);

      obj_task = get_task_info(uuid);//JSON.parse(getLocalStorage(getLocalStorage("target")));

      document.getElementById("task_name").innerHTML = obj_task.name;
      document.getElementById("task_balance").innerHTML = obj_task.token;
      document.getElementById("overview").innerHTML = obj_task.overview;
      document.getElementById("task_summary").style.visibility = "hidden";
      
    } else if (page === "issue-verifier.html") {

      var list_task_UUIDs = list_verify_tasks("203", "1");

      list_task_UUIDs = removeDuplicates(list_task_UUIDs);

      // Ready to verified tasks
      var list_summary = [];
      for (var index = 0; index < list_task_UUIDs.length; index ++) {
        list_summary = list_summary.concat(updateVerifyTasksTable(list_task_UUIDs[index]));
      }
      addVrerifyTable(list_summary);
    }
  
  } else if (page == "foot_print.html") {
    $("#nav-foot_print").addClass("active");

    // Submit weight and clear all ticket
    // TODO: clear all tickets
    // submit_weight();
    
  } else if (page == "executor-cms.html") {
    document.getElementById("username").value = getLocalStorage("username");
    document.getElementById("email").innerHTML = getLocalStorage("email");
    document.getElementById("balance").innerHTML  = get_balance();
  
    var obj_group = get_group();
    if (obj_group.group == "200" || obj_group.group == "201"){
      document.getElementById("group").innerHTML = "驗證者";
    } else {
      document.getElementById("group").innerHTML = "志工";
    }
    
    var obj_des = get_des();
    if (obj_des.result == true){
      var list_skills = obj_des.description.hhhhhhh;
      for(var index_skill = 0; index_skill<list_skills.length; index_skill++) {
        if (list_skills[index_skill] == "行政支援") {
          document.getElementById("gridCheck1").checked = true;
        }
        if (list_skills[index_skill] == "課業輔導") {
          document.getElementById("gridCheck2").checked = true;
        }
        if (list_skills[index_skill] == "社區服務") {
          document.getElementById("gridCheck3").checked = true;
        }
        if (list_skills[index_skill] == "生活扶助") {
          document.getElementById("gridCheck4").checked = true;
        }
        if (list_skills[index_skill] == "電腦科技") {
          document.getElementById("gridCheck5").checked = true;
        }
        if (list_skills[index_skill] == "環保教育") {
          document.getElementById("gridCheck6").checked = true;
        }
        if (list_skills[index_skill] == "藝術文化") {
          document.getElementById("gridCheck7").checked = true;
        }
        if (list_skills[index_skill] == "健康醫療") {
          document.getElementById("gridCheck8").checked = true;
        }
        if (list_skills[index_skill] == "權益倡導") {
          document.getElementById("gridCheck9").checked = true;
        }
        if (list_skills[index_skill] == "國際交流") {
          document.getElementById("gridCheck10").checked = true;
        }
        if (list_skills[index_skill] == "其他") {

          if (obj_des.description.others == ""){
            document.getElementById("otherCheck").checked = false;
          } else {
            document.getElementById("otherCheck").checked = true;
            document.getElementById("textArea").style.display = "block";
            document.getElementById("textArea").value = obj_des.description.others;
          }
        }
      }

    }

  } else if (page == "wallet.html") {
    $("#nav-wallet").addClass("active");
  } else if (page == "edit-info.html") {
    document.getElementById("email").innerHTML = getLocalStorage("email");
    document.getElementById("username").value = getLocalStorage("username");

    // Update avatar
    getAvatarImg(getLocalStorage("email"))
    pathAvatarImg = getLocalStorage("avatar_img");
    console.log(pathAvatarImg);
    var obj_img_avatar = document.getElementById("btn_avatar_img").firstChild;
    obj_img_avatar.style.backgroundImage = "url(" + HOST_URL_EID_DAEMON + pathAvatarImg  +  ")";
    console.log(obj_img_avatar.style.backgroundImage);
  } else if (page == "signup.html" || page == "signin.html") {
      console.log("in setpageinfo signup.html"); 
      var token = getLocalStorage("jwt");

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
            // Redirect to choice page
	           window.location.replace("/choice.html");
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
    } else if (page == "verifier-cms-list.html") {
      var arr_tasks = list_plan_tasks("00000001", "1");
      set_page_info_verifier_cms_list(arr_tasks.tasks);
      console.log(arr_tasks);
    } else if (page == "verifier-cms-content.html") {
      set_page_info_verifier_cms_content();
    } else if (page == "verified-tasks.html") {
      var repos_verified_tasks = get_verified_tasks();
      var list_verified_tasks = repos_verified_tasks.uuid;
      addVerifiedTable(list_verified_tasks);
    }
}
