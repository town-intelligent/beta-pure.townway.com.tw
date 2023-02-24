function forgot_password(email) {
  var resultJSON = {};
  var dataJSON = {};
  dataJSON.email = email;
  $.ajax({
    url: HOST_URL_EID_DAEMON + "/accounts/forgot_password",
    type: "POST",
    async: false,
    crossDomain: true,
    data:  dataJSON,
    success: function(returnData) {
      resultJSON = JSON.parse(returnData);
    },
    error: function(xhr, ajaxOptions, thrownError){
      console.log(thrownError);
    }
  });

  return resultJSON;
}


$(function () {
  $("form").on("submit", function(e){
    e.preventDefault();

    var response =  forgot_password(document.getElementById("email").value);

    if (response.result == true) {
      alert("新密碼已郵寄到您的信箱。")
    } else {
      alert("密碼變更失敗，請檢查您的信箱是否正確。")
    }
    document.getElementById("email").value = "";

  });
});
