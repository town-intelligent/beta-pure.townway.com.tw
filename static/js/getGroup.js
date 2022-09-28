const form = new FormData();
const userEmail = getLocalStorage('email');
const dataJason = {};
form.append("email", userEmail);

let settings = {
  "url": `${HOST_URL_EID_DAEMON}/accounts/get_group`,
  "method": "POST",
  "timeout": 0,
  "processData": false,
  "mimeType": "multipart/form-data",
  "contentType": false,
  "data": form
};

$.ajax(settings).done(async function (res) {
  const obj = JSON.parse(res);
  await getGroup(obj)
});

function getGroup(data){
  const Dropdown = document.getElementById('dropdown');
  /* if(data.group === '300'){
    Dropdown.innerHTML = dropdown();
  }else if(data.group === '201'){
    Dropdown.innerHTML=`
    ${dropdown()}
    <a class="dropdown-item d-flex align-items-center" href="/verifier-cms-list.html">
      <img src="/static/imgs/cooperate.svg" alt="" width="30" height="30" class="d-inline-block align-middle">
      <span class="pl-2">永續合作</span>
    </a>
    <a class="dropdown-item d-flex align-items-center" href="/verifier-cms-executor-section.html">
      <img src="/static/imgs/groups.svg" alt="" width="30" height="30" class="d-inline-block align-middle">
      <span class="pl-2">志工專區</span>
    </a>
    `
  } */
  
  if(data.group === '202'){
    Dropdown.innerHTML=`
    ${dropdown()}
    <a class="dropdown-item d-flex align-items-center" href="/verifier-cms-list.html">
      <img src="/static/imgs/cooperate.svg" alt="" width="30" height="30" class="d-inline-block align-middle">
      <span class="pl-2">永續合作</span>
    </a>
    <a class="dropdown-item d-flex align-items-center" href="/verifier-cms-executor-section.html">
      <img src="/static/imgs/groups.svg" alt="" width="30" height="30" class="d-inline-block align-middle">
      <span class="pl-2">志工專區</span>
    </a>
    `
  } else {
    Dropdown.innerHTML = dropdown();
  }
}

function dropdown () {
  return `<a class="dropdown-item d-flex align-items-center" href="/executor-cms.html">
    <img src="/static/imgs/personal_info.svg" alt="" width="30" height="30" class="d-inline-block align-middle">
    <span class="pl-2">基本資料</span>
  </a>
  <a class="dropdown-item d-flex align-items-center" href="/eid.html">
    <img src="/static/imgs/eID.svg" alt="" width="30" height="30" class="d-inline-block align-middle">
    <span class="pl-2">數位身分證</span>
  </a>
  <a class="dropdown-item d-flex align-items-center" href="/verified-tasks.html">
    <img src="/static/imgs/personal_info.svg" alt="" width="30" height="30" class="d-inline-block align-middle">
    <span class="pl-2">歷史紀錄</span>
  </a>
  <a class="dropdown-item d-flex align-items-center"onclick="logout()" href="#">
    <img src="/static/imgs/eID.svg" alt="" width="30" height="30" class="d-inline-block align-middle">
    <span class="pl-2">登出</span>
  </a>`
}

function get_account_group() {
  var dataJSON = {};
  var resultJSON = {};
  dataJSON.email = getLocalStorage("email");
  $.ajax({
    url: HOST_URL_EID_DAEMON + "/accounts/get_group",
    type: "POST",
    async: false,
    crossDomain: true,
    data:  dataJSON,
    success: function(returnData) {
      const obj = JSON.parse(returnData);
      resultJSON = obj;
    },
    error: function(xhr, ajaxOptions, thrownError){
      console.log(thrownError);
    }
  });

  return resultJSON;
}

function set_account_group(group) {
  var dataJSON = {};
  var resultJSON = {};
  dataJSON.email = getLocalStorage("email");
  dataJSON.group = group;
  $.ajax({
    url: HOST_URL_EID_DAEMON + "/accounts/set_group",
    type: "POST",
    async: false,
    crossDomain: true,
    data:  dataJSON,
    success: function(returnData) {
      const obj = JSON.parse(returnData);
      resultJSON = obj;
    },
    error: function(xhr, ajaxOptions, thrownError){
      console.log(thrownError);
    }
  });

  return resultJSON;
}
