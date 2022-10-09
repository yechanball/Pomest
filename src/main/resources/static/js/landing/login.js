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

// 로그인이 필요한 이유 클릭 -> 바텀시트 열기 (아래 -> 위 500ms)
var botSheet = document.querySelector(".bottom-sheet");
document
  .querySelector("#btn-open-bottomsheet")
  .addEventListener("click", function () {
    botSheet.classList.remove(
      "animate__animated",
      "animate__slideOutDown",
      "animate__faster"
    );
    botSheet.classList.add(
      "animate__animated",
      "animate__slideInUp",
      "animate__faster"
    );
    botSheet.style.display = "block";
  });

// X 클릭 -> 바텀시트 닫기 (위 -> 아래 500ms)
document
  .querySelector("#btn-close-bottomsheet")
  .addEventListener("click", function () {
    botSheet.classList.remove(
      "animate__animated",
      "animate__slideInUp",
      "animate__faster"
    );
    botSheet.classList.add(
      "animate__animated",
      "animate__slideOutDown",
      "animate__faster"
    );
    // botSheet.style.display = "none";
  });
