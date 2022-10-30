var postId;

// 페이지 로딩 시 게시글 요청
window.onload = function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  postId = urlParams.get("postid");

  let tmpId = postId % 2;
  console.log(tmpId);
  fetch(
    `https://yechanball.github.io/Pomest/src/main/resources/static/data/post${tmpId}.json`
  )
    .then((response) => response.json())
    .then((data) => showFeed(data));

  // fetch("/*경로 작성하기 : {mainurl}/community/post?postId=${postId} */")
  //   .then((response) => response.json())
  //   .then((data) => showFeed(data));
};

// 본문 내용 호출
function showFeed(data) {
  document.querySelector("#selected-symptoms").innerHTML = ``;
  for (let symptom of data.symptomNames) {
    let symptomLabel = document.createElement("label");
    symptomLabel.classList.add("symptom_tag_medium");
    symptomLabel.innerHTML = `<span>${symptom}</span>`;
    document.querySelector("#selected-symptoms").appendChild(symptomLabel);
  }
  document.querySelector("#input-content").value = data.content;
}

// 본문 작성 입력 받기
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

document.querySelector(".popup").style.display = "none";

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
  location.href = "./view.html?postid=" + postId;
});

// 글수정 완료 버튼 클릭 시
document.querySelector("#btn-complete").addEventListener("click", function () {
  if (document.querySelector("#input-content").value.length > 0) {
    location.href = "./view.html?postid=" + postId;
  }
});