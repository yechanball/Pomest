// 신고내용 작성 입력 받기
document
  .querySelector("#input-content")
  .addEventListener("keyup", function (e) {
    let content = document.querySelector("#input-content").value;
    if (content.length > 0) {
      document
        .querySelector("#btn-complete")
        .classList.replace("button-ghost-disabled", "button-ghost-default");
    } else {
      document
        .querySelector("#btn-complete")
        .classList.replace("button-ghost-default", "button-ghost-disabled");
    }
  });

// 뒤로가기 버튼 클릭 시
document.querySelector("#btn-move-back").addEventListener("click", function () {
  document.querySelector(".popup").style.display = "";
});

// 팝업 버튼
document
  .querySelector("#btn-popup-close")
  .addEventListener("click", function () {
    document.querySelector(".popup").style.display = "none";
  });
document.querySelector("#btn-delete").addEventListener("click", function () {
  location.href = "./main.html";
});

// 신고 완료 버튼 클릭 시
document.querySelector("#btn-complete").addEventListener("click", function () {
  let content = document.querySelector("#input-content").value;
  if (content.length > 0) {
    /////////////////////////////////////////
    // 서버 요청 부분
    // let config = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     // content : content
    //   }),
    // };
    // fetch("URL", config)
    //   .then((response) => response.json())
    //   .then(
    //     (data) =>
    //       function (data) {
    //         if (data.code == 200) {
    //           document.querySelector("#suggest").style.display = "none";
    //           document.querySelector("#suggest-done").style.display = "";
    //         } else {
    //           alert("신고 접수가 정상적으로 되지 않았습니다!!");
    //         }
    //       }
    //   );
    /////////////////////////////////////////

    document.querySelector("#suggest").style.display = "none";
    document.querySelector("#suggest-done").style.display = "";
  }
});

// 커뮤니티 메인으로 가기
document.querySelector("#btn-mv-main").addEventListener("click", function () {
  location.href = "./main.html";
});
