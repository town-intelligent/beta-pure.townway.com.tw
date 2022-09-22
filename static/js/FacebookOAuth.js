function eIDFacebookLogin(input_token, res) {
  setLocalStorage("email", res.email);

  // Oauth to eID
  var dataJSON = {};
  dataJSON.email = res.email 
  dataJSON.username = res.username
  dataJSON.token = input_token
  $.ajax({
    url: HOST_URL_EID_DAEMON + "/accounts/oauth/facebook",
    type: "POST",
    async: false,
    crossDomain: true,
    data:  dataJSON,
    success: function(returnData) {
       const obj = JSON.parse(returnData);
       // Set LocalStorage
       setLocalStorage("jwt", obj.token);
       setLocalStorage("username", obj.username);
    },
    error: function(xhr, ajaxOptions, thrownError){
      console.log(thrownError);
    }
  });
   window.location.replace("/eid.html");
}
