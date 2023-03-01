var nick; // 닉네임 변수

// 페이지 로딩시 닉네임 호출
window.onload = function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  nick = urlParams.get("nick");

  if (nick == null) {
    // 닉네임이 전달되지 않은 경우
    // 에러 처리하기
    alert("닉네임이 설정되지 않았습니다!!!");
    location.href = "./join.html";
  } else {
    document.querySelector("#title-text").innerHTML =
      nick + "님에 대해<br>조금 더 알려주세요";
  }
};

// 다음에 할게요 버튼 클릭 -> 2 포스트 페이지로 이동
document.querySelector("#btn-do-next").addEventListener("click", function () {
  /////////////////////////////////////////
  // 닉네임 데이터베이스에 저장하고 페이지 이동
  location.href = "../post/main.html";
  //////////////////////////////////////////
});

// 지금 입력할게요 버튼 클릭 -> 013 기본정보 입력 페이지로 이동
document.querySelector("#btn-do-now").addEventListener("click", function () {
  location.href = "./info.html?nick=" + nick;
});
