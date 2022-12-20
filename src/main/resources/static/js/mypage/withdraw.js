document.querySelector(".btn-move-back").addEventListener("click", () => {
  location.href = "../mypage/main.html";
});

document.querySelector("#btn-submit").addEventListener("click", () => {
  let suggest = document.querySelector("#input-suggest").value;

  /*let config = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      suggest: suggest,
    }),
  };
  fetch("/mypage/", config)
    .then((response) => response.json())
    .then((data) => {
      if ((data.code = 200)) {
        location.href = "../mypage/withdrawdone.html";
      } else {
        alert("회원 탈퇴 중 에러가 발생했습니다.");
      }
    });*/

  location.href = "../mypage/withdrawdone.html";
});
