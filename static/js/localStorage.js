function setLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

function getLocalStorage(key) {
  var result = localStorage.getItem(key);

  if (result === null) {
    return "";
  } else {
    return result;
  }
}
