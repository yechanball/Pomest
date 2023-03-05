// 카카오톡 소셜 로그인 버튼 클릭
document
  .querySelector("#btn-login-kakao")
  .addEventListener("click", function () {
    //////////////////////////////////////////////
    // 카카오톡 로그인 기능 구현부
    // location.href = '/oauth2/authorization/kakao';
    //////////////////////////////////////////////
    location.href = "./join.html";
  });

// 네이버 소셜 로그인 버튼 클릭
document
  .querySelector("#btn-login-naver")
  .addEventListener("click", function () {
    //////////////////////////////////////////////
    // 네이버 로그인 기능 구현부
    // location.href = '/oauth2/authorization/naver';
    //////////////////////////////////////////////
    location.href = "./join.html";
  });

// 로그인이 필요한 이유 클릭 -> 팝업 열기
var popup = document.querySelector(".popup");
var popupBox = document.querySelector(".popup-box");
document
  .querySelector("#btn-popup-open")
  .addEventListener("click", function () {
    popup.style.display = "";
    popupBox.classList.add(
      "animate__animated",
      "animate__slideInUp",
      "animate__faster"
    );
  });

// 팝업 닫기
document
  .querySelector("#btn-popup-close")
  .addEventListener("click", function () {
    popupBox.classList.replace("animate__slideInUp", "animate__slideOutDown");
    setTimeout(() => {
      popup.style.display = "none";
      popupBox.classList.replace("animate__slideOutDown", "animate__slideInUp");
    }, 300);
  });
