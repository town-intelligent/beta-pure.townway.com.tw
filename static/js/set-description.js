function checkBoxFn() {
  let otherCheck = document.getElementById("otherCheck");
  let textArea = document.getElementById("textArea");
  if (otherCheck.checked === true) {
    textArea.style.display = "block";
  } else {
    textArea.style.display = "none";
    textArea.value = "";
  }
}
let checkArray = [];
/*
$(".skillCheck").click(function () {
  let checkValue = $(this).val();
  
  checkArray.push(checkValue);
  console.log(checkArray);
});
*/
// set_description
const submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener("click", async function () {
  const form = new FormData();
  const userEmail = getLocalStorage('email');
  const url = `${HOST_URL_EID_DAEMON}/accounts/set_description`;

  form.append("email", userEmail);
  var obj_sed = {};

  // Update check array
  var index_chk_box = 0;
  while (true) {
    if (document.getElementById("gridCheck" + (++index_chk_box).toString()) == null) {
      break;
    }
    if (document.getElementById("gridCheck" + (index_chk_box).toString()).checked) {
      checkArray.push(document.getElementById("gridCheck" + (index_chk_box).toString()).value);
    }
  }
  obj_sed.hhhhhhh = checkArray;

  // Append others
  if (document.getElementById("otherCheck") != null) {
    checkArray.push("其他");
    obj_sed.others = document.getElementById("textArea").value;
  }

  // form.append("description", `{"hhhhhhh":[${checkArray}]}`);
  form.append("description", JSON.stringify(obj_sed));

  await setDescription(url, form);

  alert("設定成功！");
  window.location.replace("/eid.html");
});

async function setDescription(url, data) {
  try {
    const res = await axios.post(url, data);
    console.log(res);

  } catch (error) {
    console.error(error);
  }
}