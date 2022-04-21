function eIDLogin(id_token, res) {
  setCookie("jwt", id_token, 1);
  setCookie("email", res.result.emailAddresses[0].value, 1);

  // Oauth to eID
  var dataJSON = {};
  dataJSON.email = res.result.emailAddresses[0].value;
  dataJSON.username = res.result.names[0].displayName;
  dataJSON.token = id_token
  $.ajax({
    url: HOST_URL_EID_DAEMON + "/accounts/oauth/google",
    type: "POST",
    async: false,
    crossDomain: true,
    data:  dataJSON,
    success: function(returnData) {
       const obj = JSON.parse(returnData);
       // Set Cookie
       setCookie("jwt", obj.token, 1);
       setCookie("username", obj.username, 1);
    },
    error: function(xhr, ajaxOptions, thrownError){
      console.log(thrownError);
    }
  });
   window.location.replace("/eid.html");
}

//jQuery處理button click event 當畫面DOM都載入時....
$(function () {
    $("#btnSignIn").on("click", function () {
	// $("#content").html("");//清空顯示結果
	GoogleLogin();//Google 登入
    });
});

function GoogleClientInit() {
    //官網範例寫client:auth2，但本人實測由於待會要呼叫gapi.client.init而不是gapi.auth2.init，所以給client即可
    gapi.load('client', function () {
	gapi.client.init({
	    //client_id 和 scope 兩者參數必填
	    // clientId: CLIENT_ID,
	    clientId: "1080674192413-b1vnqslm4gif3p9ntaj4ifl4i572p0bn.apps.googleusercontent.com",
	    //scope列表參考：https://developers.google.com/people/api/rest/v1/people/get
	    //"profile"是簡寫，要用完整scope名稱也可以
	    scope: "profile",//"https://www.googleapis.com/auth/userinfo.profile",
	    // discoveryDocs: DISCOVERY_DOCS
	    discoveryDocs:  ["https://www.googleapis.com/discovery/v1/apis/people/v1/rest"]
	});

    });//end gapi.load
}//end GoogleClientInit function

function GoogleLogin() {
    let auth2 = gapi.auth2.getAuthInstance();//取得GoogleAuth物件

    auth2.signIn().then(function (GoogleUser) {
	console.log("Google登入成功");
	let user_id = GoogleUser.getId();//取得user id，不過要發送至Server端的話，為了資安請使用id_token，本人另一篇文章有範例：https://dotblogs.com.tw/shadow/2019/01/31/113026
	console.log(`user_id:${user_id}`);
	let AuthResponse = GoogleUser.getAuthResponse(true) ;//true會回傳包含access token ，false則不會
	let id_token = AuthResponse.id_token;//取得id_token
	//people.get方法參考：https://developers.google.com/people/api/rest/v1/people/get
	gapi.client.people.people.get({
	    'resourceName': 'people/me',
	    //通常你會想要知道的用戶個資↓
	    'personFields': 'names,emailAddresses',
	}).then(function (res) {

		//success
		let str = JSON.stringify(res.result);//將物件列化成string，方便顯示結果在畫面上
		//顯示授權你網站存取的用戶個資
		// document.getElementById('content').innerHTML = str;
		console.log("hello, Google oauth success!, the response = " + str);
		//↑通常metadata標記primary:true的個資就是你該抓的資料

		//請再自行Parse JSON，可以將JSON字串丟到線上parse工具查看：http://json.parser.online.fr/


		//最終，取得用戶個資後看要填在畫面表單上或是透過Ajax儲存到資料庫(記得是傳id_token給你的Web Server而不是明碼的user_id喔)，本範例就不贅述，請自行努力XD
		eIDLogin(id_token, res);
	});

    },
	function (error) {
	    console.log("Google登入失敗");
	    console.log(error);
	});

}//end function GoogleLogin
