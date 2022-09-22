// Get balance

function get_balance(){
  var dataJSON = {};
  var resultJSON = {};
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
      resultJSON = obj;
    },
    error: function(xhr, ajaxOptions, thrownError){
      console.log(thrownError);
    }
  });

  return resultJSON;
}