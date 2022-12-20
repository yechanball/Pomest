// 뒤로가기 제어
window.onpopstate = function (event) {
  // "event" object seems to contain value only when the back button is clicked
  // and if the pop state event fires due to clicks on a button
  // or a link it comes up as "undefined"
  if (event) {
    alert("뒤로가기");
    location.href = "../landing/login.html";
    // Code to handle back button or prevent from navigation
  } else {
    alert("뒤로가기 else");
    location.href = "../landing/login.html";
    // Continue user action through link or button
  }
};
