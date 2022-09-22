// http://jsfiddle.net/DerekL/3wRpA/
// https://stackoverflow.com/questions/53651409/writing-a-base64-string-to-file-in-python-not-working
// https://stackoverflow.com/questions/34116682/save-base64-image-python
/*The FileModal Class*/
function FileModal(accept) {
  var callback = function() {};
  return {
    show: function() {
      $("<input>").attr({
        type: "file",
        accept: accept
      }).appendTo("body").hide().change(function(e) {
        var file = e.target.files[0],
          reader = new FileReader();
        reader.onload = function(progress) {
          callback(progress.target.result);
        };
        reader.readAsDataURL(file);
      }).click();
    },
    set onload(c) {
      callback = c;
    }
  }
}

function setImgToLS(ls_key) {
  var file = new FileModal("image/png");
  file.onload = function(d) {
    setLocalStorage(ls_key, d);

    if ( null != document.getElementById(ls_key)) {
      document.getElementById(ls_key).src = d;
    }
  };
  file.show();
}